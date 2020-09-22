import { existsSync } from "./_deps.ts";

export async function deleteDirs(dirs: string[]) {
    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        if (existsSync(dir)) {
            await Deno.remove(dir, { recursive: true });
        }
    }
}
