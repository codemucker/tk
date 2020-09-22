/*
 * List all currently available tasks
 */

import { existsSync, getLogger } from "./_deps.ts";

const log = getLogger("tk:projects");

const startDir = Deno.env.get("TK_CWD");
const userHome = Deno.env.get("HOME");
log.trace(`looking for tasks from '${startDir}'`);
let count = 15;

function walkUpListingScripts() {
    let dir = startDir;
    const tasksByPath: { [name: string]: string } = {};

    const tasks = new Set<string>();
    while (true) {
        count--;
        const binDir = `${dir}/bin`;
        //log.info("trying:" + binDir);
        if (existsSync(binDir)) {
            const contents = Deno.readDirSync(binDir);
            //log.info("contents", { contents });
            for (const entry of contents) {
                const name = entry.name;
                if (entry.isFile || entry.isSymlink) {
                    if (name == "tk" || name.startsWith(".") || name.startsWith("_")) {
                        continue;
                    }
                    let task = name;
                    if (task.endsWith(".sh") || task.endsWith(".ts")) {
                        task = task.slice(0, task.length - 3);
                    }
                    if (!tasksByPath[task]) {
                        tasksByPath[task] = `(${dir}/bin/${name})`;
                    }
                    //     console.log(`${task}   (${name})`);
                }
            }
        }
        dir = Deno.realPathSync(`${dir}/..`);

        //TODO:how about on windows machines?
        if (dir == "/" || count <= 0 || dir == userHome) {
            break;
        }
    }
    console.log("Custom tasks:");
    Object.entries(tasksByPath).forEach((entry) => {
        console.log(`   ${entry[0]}     ${entry[1]}`);
    });
}

walkUpListingScripts();
