/*
 * List all currently available tasks
 */

import { TK_CWD, TK_SCRIPT_ROOT } from "./_cfg.ts";
import { findTasksInDir, printTasks, walkUpDirFindingTasks } from "./_tasks.ts";

console.log("Builtin tasks:");
printTasks(findTasksInDir(`${TK_SCRIPT_ROOT}/bin`));
printTasks(findTasksInDir(`${TK_SCRIPT_ROOT}/bin/tasks`));

console.log("Custom tasks:");
printTasks(walkUpDirFindingTasks(TK_CWD));
console.log("For builtin tasks, run 'tk help' or 'tk tk.help'");
