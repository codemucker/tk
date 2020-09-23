/*
 * Invoke oa given git command on each project
 */

import { exec, existsSync, getLogger } from "./_deps.ts";
import { readWorkspace } from "./_workspace.ts";

const log = getLogger("tk.projects.git");

const workspace = await readWorkspace();
log.info(`workspaceRoot '${workspace.rootDir}'`);

async function execGitCmdPerProject(gitCmd: string) {
    const projects = workspace.projects;
    let count = 0;

    for (const proj of projects) {
        count++;
        const projExists = existsSync(`./${proj.dir}`);
        log.trace(`projExists:${projExists}, proj:${proj.dir}`);
        log.info(`${count}/${projects.length} ${proj.dir} - git`);
        await exec({ cmd: `git ${gitCmd}`, dir: workspace.rootDir + "/" + proj.dir, silent: false });
    }
}

await execGitCmdPerProject(Deno.args.join(" "));
