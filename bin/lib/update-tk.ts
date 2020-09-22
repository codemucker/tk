/*
 * List all currently available tasks
 */

import { TK_CWD } from "./_cfg.ts";
import { exec, getLogger } from "./_deps.ts";

const log = getLogger("tk:update");
log.info("Updating tk");
await exec({ cmd: `git pull`, dir: TK_CWD, silent: false });
