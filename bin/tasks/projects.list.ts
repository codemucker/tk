/*
 * Invoke operations on a set of projects defined in a projects.json file
 */

import { getLogger } from "./_deps.ts";
import { readWorkspace } from "./_workspace.ts";

const log = getLogger("tk.projects.list");

const workspace = await readWorkspace();
log.info(`workspaceRoot '${workspace.rootDir}'`);

const projects = workspace.projects;
let count = 0;
projects.forEach((proj) => {
    count++;
    log.info(`${count}/${projects.length} ${proj.dir}`);
});
