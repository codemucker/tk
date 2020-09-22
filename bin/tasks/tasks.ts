/*
 * List all currently available tasks
 */

import { TK_CWD, USER_HOME_DIR } from "./_cfg.ts";
import { existsSync, getLogger } from "./_deps.ts";
const log = getLogger("tk:projects");

function walkUpListingScripts() {
    let dir = TK_CWD;
    log.trace(`looking for tasks from '${dir}'`);
    let count = 15;

    const tasksByPath: { [name: string]: string } = {};

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
        if (existsSync(`${dir}/projects.json`)) {
            break;
        }
        dir = Deno.realPathSync(`${dir}/..`);

        //TODO:how about on windows machines?
        if (dir == "/" || count <= 0 || dir == USER_HOME_DIR) {
            break;
        }
    }
    console.log("Custom tasks:");
    Object.entries(tasksByPath).forEach((entry) => {
        console.log(`   ${entry[0]}     ${entry[1]}`);
    });

    console.log("For builtin tasks, run 'tk help' or 'tk tk:help'");
}

walkUpListingScripts();
