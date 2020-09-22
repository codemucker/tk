/*
 * Print the tk help
 */

import { getLogger } from "./_deps.ts";
const log = getLogger("tk:help");

console.log("tk tasks:");
console.log("   tk help");
console.log("   tk projects <cmd>");
console.log("   tk projects help");
console.log("   tk clear-cache");
console.log("   tk tasks");
console.log("   tk <your-task-script> <script args>  (in the './bin/' dir as we walk up the folder structure)");
console.log("");
console.log(
    "   Note: that if there are any clashes with project scripts, you can call the above tasks prefixed with 'tk:'"
);
console.log("      e.g.  'tk tk:help'");
console.log("");
console.log("tk settings:");
console.log(`    TK_ROOT : '${Deno.env.get("TK_ROOT")}'`);
console.log(`    TK_CWD : '${Deno.env.get("TK_CWD")}'`);
console.log(`    DENO_DIR : '${Deno.env.get("DENO_DIR")}'`);
