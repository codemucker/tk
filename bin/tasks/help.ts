/*
 * Print the tk help
 */

import { DENO_DIR, TK_CWD, TK_SCRIPT_ROOT, TK_WORK_DIR } from "./_cfg.ts";
import { getLogger } from "./_deps.ts";

const log = getLogger("tk:help");

console.log("tk <task> <task-args>");
console.log("");
console.log("builtin tasks:");
console.log("   help                  : print this help");
console.log("   tasks                 : list all available tasks");
console.log("   projects.help         : print the help for the projects task");
console.log("   projects.list         : list al the projects");
console.log("   projects.invoke <cmd> : run the given cmd across all projects");
console.log("   projects.git <cmd>    : run the given git cmd across all projects");
console.log("   projects.find         : find all the git projects in sub dirs (to create a projects.json)");
console.log("   tk.clear-cache        : clear the deno cache to force a redownload and build of scripts");
console.log("   tk.update             : update tk to the latest version");
console.log("   <your-task-script> <script args>  (in the './bin/' dir as we walk up the folder structure)");
console.log("");
console.log(
    "   Note: that if there are any clashes with project scripts, you can call the above tasks prefixed with 'tk.'"
);
console.log("      e.g.  'tk tk.help'");
console.log("");
console.log("tk settings:");
console.log(`    TK_SCRIPT_ROOT : '${TK_SCRIPT_ROOT}'`);
console.log(`    TK_WORK_DIR    : '${TK_WORK_DIR}'`);
console.log(`    TK_CWD         : '${TK_CWD}'`);
console.log(`    DENO_DIR       : '${DENO_DIR}'`);
