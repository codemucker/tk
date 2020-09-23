import { TK_CWD, WORKSPACE_FILE } from "./_cfg.ts";
import { existsSync, getLogger, path } from "./_deps.ts";

const log = getLogger("tk._workspace");

function findWorkspaceFile() {
    let dir = TK_CWD;
    log.trace(`looking projects from ${dir}`);
    let count = 15;

    while (true) {
        count--;
        const workspaceFile = `${dir}/${WORKSPACE_FILE}`;
        log.trace(`testing file exists ${workspaceFile}`);
        if (existsSync(workspaceFile)) {
            return workspaceFile;
        }
        dir = Deno.realPathSync(`${dir}/..`);

        //TODO:how about on windows machines?
        if (dir == "/" || count <= 0) {
            break;
        }
    }
    throw `Could not find '${WORKSPACE_FILE}' file anywhere in the folder hierachy`;
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

export type Workspace = {
    rootDir: string;
    workspaceFile: string;
    projects: Project[];
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

export async function readWorkspace(): Promise<Workspace> {
    const workspaceFile = findWorkspaceFile();
    const workspaceJson = JSON.parse(await Deno.readTextFile(workspaceFile));
    log.trace("Found workspace file", { file: workspaceFile });

    const projects = (workspaceJson?.projects || []) as ProjectJson[];
    const enabledProjects = projects.map(toProject).filter((p) => p.enabled);

    const workspaceRoot = path.dirname(workspaceFile);
    return { rootDir: workspaceRoot, projects: enabledProjects, workspaceFile: workspaceFile };
}
