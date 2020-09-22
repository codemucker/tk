// the callers current working dir
export const TK_CWD = Deno.env.get("TK_CWD");

export const TK_ROOT = Deno.env.get("TK_ROOT");
// where tk install stuff
export const TK_DIR = Deno.env.get("TK_DIR");
export const TK_TOOLS_INSTALL_DIR = `${TK_DIR}/tools`;

// where deno stores it's stuff
export const DENO_DIR = Deno.env.get("DENO_DIR");

export const USER_HOME_DIR = Deno.env.get("HOME");

export const PROJECTS_FILE = "projects.json";