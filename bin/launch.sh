#!/usr/bin/env bash

if [[ ! -d "./assets" ]]; then
  ./bin/build.sh development
  sleep 2
fi

# bring docker online (background)
docker compose up -d

DOTS="\n \033[0;32m***\033[0m"
echo -e "${DOTS} ${DOTS} Launching your default browser... ${DOTS}\n"

# launch in browser
sleep 2
python -m webbrowser http://localhost:8000/
