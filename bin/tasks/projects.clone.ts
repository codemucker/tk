/*
 * Cloen or update all the projects
 */

import { WORKSPACE_FILE } from "./_cfg.ts";
import { exec, existsSync, getLogger } from "./_deps.ts";
import { readWorkspace } from "./_workspace.ts";

const log = getLogger("tk.projects.clone");

const workspace = await readWorkspace();
log.info(`workspaceRoot '${workspace.rootDir}'`);

const projects = workspace.projects;
let count = 0;
for (const proj of projects) {
    count++;
    const projExists = existsSync(`${workspace.rootDir}/${proj.dir}/`);
    log.trace(`projExists:${projExists}, proj:${proj.dir}`);
    if (projExists) {
        log.info(`${count}/${projects.length} ${proj.dir} - exists, skipping clone`);
    } else {
        let canAccessRepo = true;
        try {
            await exec({
                cmd: `git ls-remote ${proj.repo} >/dev/null  2>/dev/null`,
                dir: workspace.rootDir,
                silent: false,
                logError: false,
            });
        } catch (err) {
            canAccessRepo = false;
            log.warn(`No access to repo '${proj.repo}', skipping`);
        }
        if (canAccessRepo) {
            log.info(`${count}/${projects.length} ${proj.dir} - cloning`);
            await exec({ cmd: `git clone ${proj.repo} ${proj.dir}`, dir: workspace.rootDir });
        }
    }
    const subWorkspaceFile = `${workspace.rootDir}/${proj.dir}/${WORKSPACE_FILE}`;
    if (existsSync(subWorkspaceFile)) {
        log.info(`Cloning sub projects in workspace '${subWorkspaceFile}'`);
        await exec({ cmd: "tk tk.projects.clone", dir: `${workspace.rootDir}/${proj.dir}`, silent: false });
      

      const gitModules=`${workspace.rootDir}/${proj.dir}/.gitmodules`
        if (existsSync(gitModules)) {
            log.info(`Worskapce has git modules, checking out sub modules`)
            await exec({ cmd: 'git submodule update --init', dir: `${workspace.rootDir}/${proj.dir}`, silent: false});      
        }

        const subWorkspace = await readWorkspace(subWorkspaceFile);
        const postCloneCmd = subWorkspace["post.clone"]
        if(postCloneCmd){
            log.info(`Running post clone cmd '${postCloneCmd}'`)
            await exec({ cmd: postCloneCmd, dir: `${workspace.rootDir}/${proj.dir}`, silent: false});
        }
    }
}
