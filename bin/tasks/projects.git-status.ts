/*
 * Get a pretty git summary of each project
 */

import { exec, existsSync, getLogger } from "./_deps.ts";
import { readWorkspace } from "./_workspace.ts";

const log = getLogger("tk.projects.git-status");

const workspace = await readWorkspace();
log.info(`workspaceRoot '${workspace.rootDir}'`);

const projects = workspace.projects;
let count = 0;
for (const proj of projects) {
    count++;
    const projExists = existsSync(`./${proj.dir}`);
    log.trace(`projExists:${projExists}, proj:${proj.dir}`);
    log.info(`${count}/${projects.length} ${proj.dir} - git`);
    await exec({ cmd: `git branch`, dir: workspace.rootDir + "/" + proj.dir, silent: false });
    await exec({ cmd: `git status -s`, dir: workspace.rootDir + "/" + proj.dir, silent: false });
}
