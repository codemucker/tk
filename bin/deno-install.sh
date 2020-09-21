#!/usr/bin/env bash

#
# Installs or upgrades/downgrades deno
#

set -Eeuo pipefail & set -e

root_dir="$(dirname "$(realpath "${0%/..}")")/.."
cd "$root_dir" # set the CWD to the root dir
source bin/.common-include.sh

echo "downloading and installing deno '$DENO_VERSION'"
curl -fsSL https://deno.land/x/install/install.sh | sh -s v$DENO_VERSION
deno --verson
