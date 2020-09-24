#!/usr/bin/env bash

#
# Install the tk (TookKit) runner
#

set -Eeuo pipefail
tk_home="$HOME/.tk"

if [[ -d "$tk_home" ]]; then
	echo "'tk' already installed in '$tk_home'. Run 'tk tk.update' to upgrade to latest version"
else
	echo "installing tk to '$tk_home'"
	git clone --branch master --single-branch  git@github.com:codemucker/tk.git "$tk_home"
fi
if [[ ! -f "$HOME/bin/tk" ]]; then
	ln -s "$tk_home/bin/tk" "$HOME/bin/tk"
fi
