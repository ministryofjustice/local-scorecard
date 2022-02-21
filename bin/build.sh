#!/usr/bin/env bash

MIX_RUNNER=$1

if [[ -d "./assets" ]]; then
  if [[ -d "./node_modules" ]]; then
    rm -r ./node_modules
  fi
  rm -r ./dist ./mix-manifest.json ./package-lock.json
fi

npm install
npm run $MIX_RUNNER

