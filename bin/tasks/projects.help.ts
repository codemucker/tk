/*
 * Print the projects help
 */

import { readWorkspace } from "./_workspace.ts";

const workspace = await readWorkspace();
log.info(`workspaceRoot '${workspace.rootDir}'`);

console.log("tk projects.clone              : clone all projects");
console.log("tk projects.git <git-cmd>      : run the given git command on each project");
console.log("tk projects.git-status         : get a quick git status for each project");
console.log("tk projects.list               : list all projects");
console.log("tk projects.mvn <mvn-cmd>      : run the given maven command on each project");
console.log("tk projects.invoke <shell-cmd> : run the given shell command on each project");
console.log("tk projects.help               : print this help");
console.log("");
console.log(`workspace file  : '${workspace?.rootDir}`);
