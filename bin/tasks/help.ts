/*
 * Print the tk help
 */

import { DENO_DIR, TK_CWD, TK_ROOT } from "./_cfg.ts";
import { getLogger } from "./_deps.ts";

const log = getLogger("tk:help");

console.log("tk tasks:");
console.log("   tk help           : print this help");
console.log("   tk projects <cmd>");
console.log("   tk projects help  : print he help for the projects task");
console.log("   tk clear-cache    : clear the deno cache to force a redownload and build of scripts");
console.log("   tk tasks          : list available custom tasks");
console.log("   tk update-tk      : update tk to the latest version");
console.log("   tk <your-task-script> <script args>  (in the './bin/' dir as we walk up the folder structure)");
console.log("");
console.log(
    "   Note: that if there are any clashes with project scripts, you can call the above tasks prefixed with 'tk:'"
);
console.log("      e.g.  'tk tk:help'");
console.log("");
console.log("tk settings:");
console.log(`    TK_ROOT : '${TK_ROOT}'`);
console.log(`    TK_CWD : '${TK_CWD}'`);
console.log(`    DENO_DIR : '${DENO_DIR}'`);
