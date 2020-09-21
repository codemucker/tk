import { existsSync, getLogger, readJsonSync } from "./_deps.ts";

const log = getLogger("tk.projects");

const startDir = Deno.env.get("TK_CWD");

log.trace(`looking projects from ${startDir}`);
const PROJECTS_FILE = "projects.json";
let count = 15;

function findProjectFile() {
    let dir = startDir;
    while (true) {
        count--;
        const projectsFile = `${dir}/${PROJECTS_FILE}`;
        log.trace(`trying projectsFile=${projectsFile}`);
        if (existsSync(projectsFile)) {
            return projectsFile;
        }
        dir = Deno.realPathSync(`${dir}/..`);

        //TODO:how about on windows machines?
        if (dir == "/" || count <= 0) {
            break;
        }
    }
    throw `Could not find '${PROJECTS_FILE}' file anywhere in the folder hierachy`;
}

type ProjectJson = {
    name: string;
    dir?: string;
    repo: string;
    branch?: string;
    tags?: string[];
    enabled?: boolean;
};

export type Project = {
    name: string;
    dir: string;
    repo: string;
    branch: string;
    tags: string[];
    enabled: boolean;
};

function toProject(proj: ProjectJson): Project {
    return {
        name: proj.name.trim(),
        dir: (proj.dir || proj.name).trim(),
        branch: (proj.branch || "master").trim(),
        repo: proj.repo.trim(),
        tags: proj.tags || [],
        enabled: proj.enabled == undefined ? true : proj.enabled,
    };
}

export function readProjects(): Project[] {
    const projectsJson = readJsonSync(findProjectFile()) as any;
    log.trace("Found project file", { file: PROJECTS_FILE });

    const projects = (projectsJson?.projects || []) as ProjectJson[];
    return projects.map(toProject).filter((p) => p.enabled);
}
