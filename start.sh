# Check if screen is installed
if ! [ -x "$(command -v screen)" ]; then
  apt install screen -y
fi
screen -dmS "${PWD##*/}" node .
