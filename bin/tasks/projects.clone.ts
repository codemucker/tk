/*
 * Cloen or update all the projects
 */

import { PROJECTS_FILE } from "./_cfg.ts";
import { exec, existsSync, getLogger } from "./_deps.ts";
import { readProjects } from "./_projects.ts";

const log = getLogger("tk.projects.clone");
const { projects, projectsRoot } = await readProjects();

log.info(`projectsRoot '${projectsRoot}'`);

let count = 0;
for (const proj of projects) {
    count++;
    const projExists = existsSync(`${projectsRoot}/${proj.dir}/`);
    log.trace(`projExists:${projExists}, proj:${proj.dir}`);
    if (projExists) {
        log.info(`${count}/${projects.length} ${proj.dir} - exists, skipping clone`);
    } else {
        log.info(`${count}/${projects.length} ${proj.dir} - cloning`);
        await exec({ cmd: `git clone ${proj.repo} ${proj.dir}`, dir: projectsRoot });
    }
    const subprojectsFile = `${projectsRoot}/${proj.dir}/${PROJECTS_FILE}`;
    if (existsSync(subprojectsFile)) {
        log.info(`Cloning subprojects in ${subprojectsFile}`);
        await exec({ cmd: "tk tk.projects.clone", dir: `${projectsRoot}/${proj.dir}`, silent: false });
    }
}
