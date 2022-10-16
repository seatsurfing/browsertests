#!/bin/sh
DATE=`cat report/index.json | jq -r ".stats.start"`
PERCENT=`cat report/index.json | jq ".stats.passPercent"`
echo "${DATE} => ${PERCENT}" >> report/track.txt