#!/usr/bin/env bash


## colours
RED='\033[0;31m'
GREEN='\033[0;32m'
LIGHT_BLUE='\033[1;34m'
NC='\033[0m' # No Color
DOTS="\n \033[0;32m***\033[0m"

indent() {
  sed 's/^/      /'
}

launcher() {
    echo -e "${DOTS} ${DOTS} Launching your default browser... ${DOTS}\n"

    # launch in browser
    sleep 2
    python -m webbrowser http://localhost:8000/
}


echo -e "${DOTS} ${DOTS} Firing the website up... ${DOTS}\n"

# bring docker online (background)
docker compose up -d

while true; do
  read -r -p "$(echo -e "\n\n${LIGHT_BLUE}Would you like to watch files for changes? ${NC}" | indent)" yn
  case $yn in
  [Yy]*)
    launcher
    npm run watch
    break
    ;;
  [Nn]*)
    echo -e "\nNo worries!\n\n" | indent
    launcher
    echo "Done"
    break
    ;;
  *) echo "Please answer yes or no." | indent ;;
  esac
done
