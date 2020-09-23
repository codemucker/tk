/*
 * Invoke operations on a set of projects defined in a projects.json file
 */

import { exec, existsSync, getLogger } from "./_deps.ts";
import { readWorkspace } from "./_workspace.ts";

const log = getLogger("tk.projects.invoke");

const workspace = await readWorkspace();
log.info(`workspaceRoot '${workspace.rootDir}'`);

async function eachProjectInvoke(invokeArgs: string) {
    const projects = workspace.projects;
    let count = 0;
    for (const proj of projects) {
        count++;
        const projExists = existsSync(`${workspace.rootDir}/${proj.dir}`);
        if (projExists) {
            log.info(`${count}/${projects.length} ${proj.dir} - invoke '${invokeArgs}'`);
            await exec({ cmd: `${invokeArgs}`, dir: workspace.rootDir + "/" + proj.dir, silent: false });
        }
    }
}

eachProjectInvoke(Deno.args.join(" "));
