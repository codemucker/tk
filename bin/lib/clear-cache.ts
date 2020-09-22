/*
 * Clear the deno cache so all dependencies are focred to be downloaded again, and all scripts recompiled
 */

import { getLogger } from "./_deps.ts";
import { deleteDirs } from "./_utils.ts";

const log = getLogger("tk:clear-cache");

async function deleteCacheDir() {
    const denoCacheDir = Deno.env.get("DENO_DIR");
    if (denoCacheDir && denoCacheDir != "/" && denoCacheDir.length > 3) {
        log.info(`Deleting deno cache dir '${denoCacheDir}'`);
        await deleteDirs([denoCacheDir]);
    }
}

await deleteCacheDir();
