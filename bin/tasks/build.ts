/*
 * List all currently available tasks
 */

import { PROJECTS_FILE, TK_CWD } from "./_cfg.ts";
import { exec, existsSync, getLogger } from "./_deps.ts";

const log = getLogger("tk:build");

const projectDir = TK_CWD;
if (existsSync(`${projectDir}/pom.xml`)) {
    await exec({ cmd: `mvn compile`, dir: `${projectDir}`, silent: false });
} else if (existsSync(`${projectDir}/package.json`)) {
    await exec({ cmd: `npm run build`, dir: `${projectDir}`, silent: false });
} else if (existsSync(`${projectDir}/${PROJECTS_FILE}`)) {
    await exec({ cmd: `tk projects invoke tk tk.build`, dir: `${projectDir}`, silent: false });
} else {
    log.warn("Don't know how to build this project");
}
