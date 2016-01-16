#!/bin/bash

# https://stackoverflow.com/questions/9023164/in-bash-how-can-i-run-multiple-infinitely-running-commands-and-cancel-them-all
cd client
react-dev-server &
PIDS[0]=$!

cd ../server
npm run watch &
PIDS[1]=$!

trap "kill -9 ${PIDS[*]}; echo 'Killing pids' ${PIDS[*]}" SIGINT
wait
