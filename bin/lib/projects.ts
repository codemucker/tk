/*
 * Invoke operations ona  set of projects defined in a projects.json file
 */

import { exec, existsSync, getLogger } from "./_deps.ts";
import { readProjects } from "./_projects.ts";

const log = getLogger("tk:projects");
const { projects, projectsRoot } = await readProjects();

log.info(`projectsRoot '${projectsRoot}'`);
async function listProjects() {
    let count = 0;
    projects.forEach((proj) => {
        count++;
        log.info(`${count}/${projects.length} ${proj.dir}`);
    });
}

async function eachProjectClone() {
    const promises: Promise<string>[] = [];
    let count = 0;
    for (const proj of projects) {
        count++;
        const projExists = existsSync(`${projectsRoot}/${proj.dir}/`);
        log.trace(`projExists:${projExists}, proj:${proj.dir}`);
        if (projExists) {
            log.info(`${count}/${projects.length} ${proj.dir} - exists, skipping clone`);
        } else {
            log.info(`${count}/${projects.length} ${proj.dir} - cloning`);
            await exec({ cmd: `git clone ${proj.repo} ${proj.dir}`, dir: projectsRoot });
        }
        const projFileExists = existsSync(`${projectsRoot}/${proj.dir}/projects.json`);
        if (projFileExists) {
            await exec({ cmd: "tk tk:projects clone", dir: `${projectsRoot}/${proj.dir}`, silent: false });
        }
    }
}

async function execGitCmdPerProject(gitCmd: string) {
    let count = 0;
    for (var i = 0; i < projects.length; i++) {
        const proj = projects[i];
        count++;
        const projExists = existsSync(`./${proj.dir}`);
        log.trace(`projExists:${projExists}, proj:${proj.dir}`);
        log.info(`${count}/${projects.length} ${proj.dir} - git`);
        await exec({ cmd: `git ${gitCmd}`, dir: projectsRoot + "/" + proj.dir, silent: false });
    }
}

async function gitStatusSummaryEachProject() {
    let count = 0;
    for (var i = 0; i < projects.length; i++) {
        const proj = projects[i];
        count++;
        const projExists = existsSync(`./${proj.dir}`);
        log.trace(`projExists:${projExists}, proj:${proj.dir}`);
        log.info(`${count}/${projects.length} ${proj.dir} - git`);
        await exec({ cmd: `git branch`, dir: projectsRoot + "/" + proj.dir, silent: false });
        await exec({ cmd: `git status -s`, dir: projectsRoot + "/" + proj.dir, silent: false });
    }
}

async function eachProjectMvn(mvnArgs: string) {
    let count = 0;
    for (var i = 0; i < projects.length; i++) {
        const proj = projects[i];
        count++;
        const projExists = existsSync(`./${proj.dir}`);
        log.trace(`projExists:${projExists}, proj:${proj.dir}`);
        if (projExists) {
            log.info(`${count}/${projects.length} ${proj.dir} - mvn`);
            await exec({ cmd: `mvn ${mvnArgs}`, dir: proj.dir, silent: false });
        }
    }
}

async function eachProjectInvoke(invokeArgs: string) {
    let count = 0;
    for (var i = 0; i < projects.length; i++) {
        const proj = projects[i];
        count++;
        const projExists = existsSync(`${projectsRoot}/${proj.dir}`);
        if (projExists) {
            log.info(`${count}/${projects.length} ${proj.dir} - invoke '${invokeArgs}'`);
            await exec({ cmd: `${invokeArgs}`, dir: projectsRoot + "/" + proj.dir, silent: false });
        }
    }
}

const task = Deno.args.length > 0 ? Deno.args[0] : "list";
const taskArgs = Deno.args.length > 0 ? Deno.args.slice(1).join(" ") : "";

switch (task) {
    case "list":
        listProjects();
        break;
    case "clone":
        eachProjectClone();
        break;
    case "git":
        execGitCmdPerProject(taskArgs);
        break;
    case "git-status":
        gitStatusSummaryEachProject();
        break;
    case "invoke":
        eachProjectInvoke(taskArgs);
        break;
    case "mvn":
        eachProjectMvn(taskArgs);
        break;
    case "":
    case "help":
        console.log("tk projects clone : clone all projects");
        console.log("tk projects git <git-cmd> : run the given git command on each project");
        console.log("tk projects git-status : get a quick git status for each project");
        console.log("tk projects list : list all projects");
        console.log("tk projects mvn <mvn-cmd> : run the given maven command on each project");
        console.log("tk projects invoke <shell-cmd> : run the given shell command on each project");
        break;
    default:
        throw Error(`No project task '${task}'. Args '${Deno.args}'`);
}
