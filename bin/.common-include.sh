#!/usr/bin/env bash

# 
# Contains common utility functions. Use underscores to not clash with built in shell versions
#

set -Eeuo pipefail & set -e

DENO_VERSION=1.3.0

function _get_command_or(){
	local cmd=$1
	local cmd_alternative=$2

	if command -v $cmd &> /dev/null
	then
    	echo $cmd    
    	return
	fi

	if [[ "$cmd_alternative" == "" ]]; then
		echo "Could not find command '$cmd'"
		exit 1
	fi
	
	if command -v $cmd_alternative &> /dev/null
	then
    	echo $cmd_alternative
    	return
	fi

	echo "Could not find command '$cmd' or it's alternative '$cmd_alternative'"
	exit 1
}

_realpath=$(_get_command_or 'realpath' 'grealpath')
_readlink=$(_get_command_or 'readlink' 'greadlink')
_timeout=$(_get_command_or 'timeout' 'gtimeout')
