#!/usr/bin/env bash

# creates new workspace when passed name param such as: day12
# requires gsed installed if on Mac: brew install gnu-sed

npm init -y --scope @aoc-2022 -w ./packages/"$1" # init the workspace
cp -r ./packages/day1/. ./packages/"$1"          # copy the files from day1
OS=$(uname)
DAY_NUM=$(expr "$1" : "[^0-9]*\([0-9]*\)")
if [ "$OS" = 'Darwin' ]; then
  # for MacOS
  gsed -i "s/day1/$1/g" ./packages/"$1"/package.json         # rename inside package.json
  gsed -i "s/Day 1/Day $DAY_NUM/g" ./packages/"$1"/readme.md # rename inside readme.md
else
  # for Linux and Windows
  sed -i "s/day1/$1/g" ./packages/"$1"/package.json         # rename inside package.json
  sed -i "s/Day 1/Day $DAY_NUM/g" ./packages/"$1"/readme.md # rename inside readme.md
fi

rm -rf ./packages/"$1"/src/input.txt ./packages/"$1"/dist/ ./packages/"$1"/tsconfig.tsbuildinfo # remove old input.txt and build artifacts
touch ./packages/"$1"/src/input.txt                                                             # make fresh input.txt
npm install
