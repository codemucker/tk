/*
 * Invoke operations on a set of projects defined in a projects.json file
 */

import { exec, existsSync, getLogger } from "./_deps.ts";
import { readProjects } from "./_projects.ts";

const log = getLogger("tk.projects.mvn");
const { projects, projectsRoot } = await readProjects();

log.info(`projectsRoot '${projectsRoot}'`);

async function eachProjectMvn(mvnArgs: string) {
    let count = 0;
    for (var i = 0; i < projects.length; i++) {
        const proj = projects[i];
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
