#!/usr/bin/env bash

#
# Install the tk (TookKit) runner
#

set -Eeuo pipefail
git clone git@github.com:codemucker/tk.git -branch master --single-branch  ~/.tk/
ln -s ~/.tk/bin/tk ~/bin/tk
