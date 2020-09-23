/*
 * Invoke oa given git command on each project
 */

import { exec, existsSync, getLogger } from "./_deps.ts";
import { readProjects } from "./_projects.ts";

const log = getLogger("tk.projects.git");
const { projects, projectsRoot } = await readProjects();

log.info(`projectsRoot '${projectsRoot}'`);

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

await execGitCmdPerProject(Deno.args.join(" "));
