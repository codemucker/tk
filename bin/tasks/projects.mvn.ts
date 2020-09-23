/*
 * Invoke operations on a set of projects defined in a projects.json file
 */

import { exec, existsSync, getLogger } from "./_deps.ts";
import { readWorkspace } from "./_workspace.ts";

const log = getLogger("tk.projects.mvn");

const workspace = await readWorkspace();
log.info(`workspaceRoot '${workspace.rootDir}'`);

const projects = workspace.projects;
async function eachProjectMvn(mvnArgs: string) {
    let count = 0;
    for (const proj of projects) {
        count++;
        const projExists = existsSync(`./${proj.dir}`);
        log.trace(`projExists:${projExists}, proj:${proj.dir}`);
        if (projExists) {
            log.info(`${count}/${projects.length} ${proj.dir} - mvn`);
            await exec({ cmd: `mvn ${mvnArgs}`, dir: proj.dir, silent: false });
        }
    }
}

await eachProjectMvn(Deno.args.join(" "));
