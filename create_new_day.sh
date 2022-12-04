#!/usr/bin/env bash
npm init -y --scope @aoc-2022 -w ./packages/"$1"
cp -r ./packages/day1/. ./packages/"$1"
sed -i "s/day1/$1/g" ./packages/"$1"/package.json
sed -i "s/Day 1/Day ${1: -1}/g" ./packages/"$1"/readme.md
rm -rf ./packages/"$1"/src/input.txt ./packages/"$1"/dist/ ./packages/"$1"/tsconfig.tsbuildinfo
touch ./packages/"$1"/src/input.txt
npm install
