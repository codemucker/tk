#!/usr/bin/env bash

# 
# Common code to read the projects file and iterate over entries.
#
# Assumes the CWD is the root workspace
#

set -Eeuo pipefail & set -e

projects_file="./projects.txt"

function _projects_foreach_entry(){
    # The function to invoke with the project args
    local callback=$1
    shift
    # additional args to pass to callback for each entry
    local callback_extra_args="$@"

    local total=0
    while read -r line
    do
        if [[ $line == '' ]] || [[ $line = \#* ]]; then
          continue
        fi
        let total=total+1
    done < $projects_file

    local num=0
    while read -r p_name p_dir p_repo p_branch p_tags
    do
        if [[ "$p_name" == "" ]] || [[ $p_name = \#* ]]; then
          continue
        fi
        let num=$num+1
        $callback $total $num "$p_name" "$p_dir" "$p_repo" "$p_branch" "$p_tags" $callback_extra_args
    done < $projects_file
}

function _invoke_script(){
  proj_dir="$1"
  script="$2"
  script_args="$3"

  echo "In workspace $proj_dir"
  pushd "$proj_dir" > /dev/null
  if [[ -f ./bin/$script ]]; then
    ./bin/$script "$script_args"
  else
      echo "No 'bin/$script'"
  fi
  popd > /dev/null
}
