/*
 * Find all git projects in the cuurent sub directories
 */

import { exec, existsSync, getLogger } from "./_deps.ts";
import { Project } from "./_projects.ts";

const log = getLogger("tk:projects-find");

async function scan(dir: string, projects: Project[]) {
    const gitDir = `${dir}/.git`;
    //log.info("trying:" + binDir);
    if (existsSync(gitDir)) {
        const gitRepo = await exec({ cmd: "git remote -v", dir: dir });
        const match = gitRepo.match(/.*\s+(git@.*\.git)\s+.*/);
        if (match) {
            const repo = match[1];
            log.info(`git repo:${repo}`);
            projects.push({
                name: dir,
                dir: dir,
                repo: repo || "??",
                branch: "master",
                tags: [],
                enabled: true,
            });
        }
    }

    const dirEntries = Deno.readDirSync(dir);
    //log.info("contents", { contents });
    for (const entry of dirEntries) {
        if (entry.isDirectory) {
            const name = entry.name;
            if (name.startsWith(".") || name == "bin" || name == "node_modules" || name == "build" || name == "dist") {
                continue;
            }
            await scan(`${dir}/${entry.name}`, projects);
        }
    }
}

async function findGitProjects() {
    let dir = Deno.env.get("TK_CWD");
    if (!dir) {
        log.warn("no directory to start scan from");
        return;
    }
    const projects: Project[] = [];
    await scan(dir, projects);

    const p = {
        projects: projects,
    };
    log.info("Project file:" + JSON.stringify(p, null, "   "));
}

findGitProjects();
