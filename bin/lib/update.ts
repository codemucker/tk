/*
 * List all currently available tasks
 */

import { exec, getLogger } from "./_deps.ts";

const log = getLogger("tk:update");
const rootDir = Deno.env.get("TK_CWD");
log.info("Updating tk");
await exec({ cmd: `git pull`, dir: rootDir, silent: false });
