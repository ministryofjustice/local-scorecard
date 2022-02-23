#!/usr/bin/env bash

MIX_RUNNER=$1

DOTS="\n \033[0;32m***\033[0m"
echo -e "${DOTS} ${DOTS} Building assets... ${DOTS}\n"

if [[ -d "./assets" ]]; then
  if [[ -d "./node_modules" ]]; then
    rm -r ./node_modules
  fi
  rm -r ./dist ./mix-manifest.json ./package-lock.json
fi

npm install
npm run $MIX_RUNNER

