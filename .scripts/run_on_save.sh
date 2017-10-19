#!/usr/bin/env bash
#
WATCH_DIRECTORY=$1;
shift;

EVENT_TASK=$1;
shift;

IGNORE_PATHS="$@";

declare PKG="inotify-tools";
dpkg-query -l ${PKG} &>/dev/null || sudo apt -y install ${PKG};

echo "Will execute : '${EVENT_TASK}'";

function listVariables() {
  echo -e "Variables ::
   WATCH_DIRECTORY = ${WATCH_DIRECTORY};
   EVENT_TASK = ${EVENT_TASK};
  ";
}

function doIt() {
  sleep 1;
  ${EVENT_TASK};
};

# listVariables;

while true #run indefinitely
do
  inotifywait -qqr -e close_write,move,create,delete ${IGNORE_PATHS} ${WATCH_DIRECTORY} && doIt;
done
