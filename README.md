

# Installing

curl -s "https://raw.githubusercontent.com/codemucker/tk/master/install.sh" | bash

# About
This is the 'Tool-Kit' runner.

This provides an abstraction over all the various development tools one may use and
makes it easier to manage multiple disparate codebases

'tk' will find the appropriate script/tool to execute based on the project you are in

The current default naive implementation just searches for bin/<task>[.sh|.ts|] up the folder hierachy,
or until it reaches the workspace root dir, and falls back to tk built-in defaults after that

To install, clone this repo and link to bin/tk into your PATH (e.g ~/bin/tk==>/path/to/tk/repo/bin/tk)

Then run 'tk tk.help' for more info

