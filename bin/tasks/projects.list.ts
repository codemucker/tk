/*
 * Invoke operations on a set of projects defined in a projects.json file
 */

import { getLogger } from "./_deps.ts";
import { readProjects } from "./_projects.ts";

const log = getLogger("tk.projects.list");
const { projects, projectsRoot } = await readProjects();

log.info(`projectsRoot '${projectsRoot}'`);
let count = 0;
projects.forEach((proj) => {
    count++;
    log.info(`${count}/${projects.length} ${proj.dir}`);
});
