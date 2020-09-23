/*
 * List all currently available tasks
 */

import { USER_HOME_DIR } from "./_cfg.ts";
import { existsSync, getLogger, path, rightPad } from "./_deps.ts";
const log = getLogger("tk:projects");

export type Task = {
    name: string;
    filename: string;
    dir: string;
};
function _findTasksInDir(tasksByName: { [name: string]: Task }, dir: string) {
    log.trace(`looking for tasks in '${dir}'`);

    //log.info("trying:" + binDir);
    if (existsSync(dir)) {
        const contents = Deno.readDirSync(dir);
        //log.info("contents", { contents });
        for (const entry of contents) {
            const filename = entry.name;
            if (entry.isFile || entry.isSymlink) {
                if (filename == "tk" || filename.startsWith(".") || filename.startsWith("_")) {
                    continue;
                }
                let task = filename;
                if (task.endsWith(".sh") || task.endsWith(".ts")) {
                    task = task.slice(0, task.length - 3);
                }
                if (!tasksByName[task]) {
                    tasksByName[task] = {
                        name: task,
                        filename: filename,
                        dir: path.normalize(dir),
                    };
                }
                //     console.log(`${task}   (${name})`);
            }
        }
    }
}

export function findTasksInDir(dir: string) {
    const tasksByName: { [name: string]: Task } = {};
    _findTasksInDir(tasksByName, dir);
    return tasksByName;
}

export function walkUpDirFindingTasks(dir: string): { [name: string]: Task } {
    log.trace(`looking for tasks from '${dir}'`);
    let count = 15;

    const tasksByName: { [name: string]: Task } = {};
    while (true) {
        count--;
        _findTasksInDir(tasksByName, `${dir}/bin`);
        if (existsSync(`${dir}/projects.json`)) {
            break;
        }
        dir = Deno.realPathSync(`${dir}/..`);

        //TODO:how about on windows machines?
        if (dir == "/" || count <= 0 || dir == USER_HOME_DIR) {
            break;
        }
    }

    return tasksByName;
}

export function printTasks(tasksByName: { [name: string]: Task }) {
    const sortedNames = Object.keys(tasksByName);
    sortedNames.sort();
    for (const name of sortedNames) {
        const task = tasksByName[name];
        console.log(`   ${rightPad(task.name, 25)} ${task.dir}/${task.filename}`);
    }
}
