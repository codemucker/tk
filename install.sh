#!/usr/bin/env bash

#
# Install the tk (TookKit) runner
#

set -Eeuo pipefail & set -e

cd "${0%/*}/.." # set the CWD to the root dir

if ! command -v tk command -v o &> /dev/null; then
    echo "'tk' is not installed. Installing to ~/.tk" 
    git clone git@github.com:codemucker/tk.git ~/.tk/
    pushd ~/.tk/ >/dev/null
        git checkout master
        ln -s ~/.tk/bin/tk ~/bin/tk
    popd >/dev/null
fi

