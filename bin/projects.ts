import { exec, existsSync, getLogger } from "./_deps.ts";
import { readProjects } from "./_projects.ts";

const log = getLogger("tk.projects");

async function listProjects() {
    const projects = readProjects();
    let count = 0;
    projects.forEach((proj) => {
        count++;
        log.info(`${count}/${projects.length} ${proj.dir}`);
    });
}

async function eachProjectClone() {
    const projects = readProjects();
    const promises: Promise<string>[] = [];
    let count = 0;
    projects.forEach((proj) => {
        count++;
        const projExists = existsSync(`./${proj.dir}`);
        log.trace(`projExists:${projExists}, proj:${proj.dir}`);
        if (projExists) {
            log.info(`${count}/${projects.length} ${proj.dir} - exists, skipping clone`);
        } else {
            log.info(`${count}/${projects.length} ${proj.dir} - cloning`);
            const p = exec({ cmd: `git clone ${proj.repo} ${proj.dir}` });
            promises.push(p);
        }
    });

    await Promise.all(promises);
}

async function execGitCmdPerProject(gitCmd: string) {
    const projects = readProjects();
    let count = 0;
    for (var i = 0; i < projects.length; i++) {
        const proj = projects[i];
        count++;
        const projExists = existsSync(`./${proj.dir}`);
        log.trace(`projExists:${projExists}, proj:${proj.dir}`);
        log.info(`${count}/${projects.length} ${proj.dir} - git`);
        await exec({ cmd: `git ${gitCmd}`, dir: proj.dir, silent: false });
    }
}

async function eachProjectMvn(mvnArgs: string) {
    const projects = readProjects();
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
    const projects = readProjects();
    let count = 0;
    for (var i = 0; i < projects.length; i++) {
        const proj = projects[i];
        count++;
        const projExists = existsSync(`./${proj.dir}`);
        if (projExists) {
            log.info(`${count}/${projects.length} ${proj.dir} - invoke`);
            await exec({ cmd: `${invokeArgs}`, dir: proj.dir, silent: false });
        }
    }
}

const task = Deno.args[0];
const taskArgs = Deno.args.slice(1).join(" ");

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
    case "invoke":
        eachProjectInvoke(taskArgs);
        break;
    case "mvn":
        eachProjectMvn(taskArgs);
        break;
    case "help":
        log.info("tk project clone : clone all projects");
        log.info("tk project git <git-cmd> : run the given git command on each project");
        log.info("tk project list : list all projects");
        log.info("tk project mvn <mvn-cmd> : run the given maven command on each project");
        log.info("tk project invoke <shell-cmd> : run the given shell command on each project");
        break;
    default:
        throw Error(`No project task '${task}'. Args '${Deno.args}'`);
}
