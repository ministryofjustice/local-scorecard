#!/usr/bin/env bash

# bring docker online (background)
docker compose up -d

DOTS="\n \033[0;32m***\033[0m"
echo -e "${DOTS} ${DOTS} Launching your default browser... ${DOTS}\n"

# launch in browser
sleep 2
python -m webbrowser http://localhost:8000/
