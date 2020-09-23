/*
 * Invoke operations on a set of projects defined in a projects.json file
 */

import { exec, existsSync, getLogger } from "./_deps.ts";
import { readProjects } from "./_projects.ts";

const log = getLogger("tk.projects.invoke");
const { projects, projectsRoot } = await readProjects();

log.info(`projectsRoot '${projectsRoot}'`);

async function eachProjectInvoke(invokeArgs: string) {
    let count = 0;
    for (var i = 0; i < projects.length; i++) {
        const proj = projects[i];
        count++;
        const projExists = existsSync(`${projectsRoot}/${proj.dir}`);
        if (projExists) {
            log.info(`${count}/${projects.length} ${proj.dir} - invoke '${invokeArgs}'`);
            await exec({ cmd: `${invokeArgs}`, dir: projectsRoot + "/" + proj.dir, silent: false });
        }
    }
}

eachProjectInvoke(Deno.args.join(" "));
