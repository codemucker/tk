/*
 * Run a command in a dev docker container
 */

import { TK_CWD, TK_SCRIPT_ROOT } from "./_cfg.ts";
import { exec, existsSync, getLogger, hashCode } from "./_deps.ts";

const log = getLogger("tk:docker");

async function invoke(args: string[]) {
    log.info("running docker command", { args });
    //find Dockerfile for project
    const imageName = `codemucker/tk-project-runner:${hashCode(TK_CWD)}:dev`;
    if (existsSync(`${TK_CWD}/Dockerfile`)) {
        await exec({
            cmd: `docker build --target development -t ${imageName} .`,
            dir: TK_SCRIPT_ROOT,
            silent: true,
        });
    } else {
        await exec({
            cmd: `docker build --target development -t ${imageName} .`,
            dir: TK_SCRIPT_ROOT,
            silent: true,
        });
    }
    await exec({
        cmd: `docker run -it -v ${TK_CWD}:/src ${imageName} ${args.join(" ")}`,
        dir: TK_SCRIPT_ROOT,
        silent: false,
    });
}

invoke(Deno.args);
