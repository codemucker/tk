/*
 * List all currently available tasks
 */

import { exec, existsSync, getLogger } from "./_deps.ts";

const log = getLogger("tk:build");

const projectDir = Deno.env.get("TK_CWD");
if (existsSync(`${projectDir}/pom.xml`)) {
    await exec({ cmd: `mvn compile`, dir: `${projectDir}`, silent: false });
} else if (existsSync(`${projectDir}/package.json`)) {
    await exec({ cmd: `npm run build`, dir: `${projectDir}`, silent: false });
} else if (existsSync(`${projectDir}/projects.json`)) {
    await exec({ cmd: `tk projects invoke tk tk:build`, dir: `${projectDir}`, silent: false });
}
