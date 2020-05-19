#!/bin/bash

DIR=`dirname "$(readlink -f "$0")"`

# Setup Python environment
#
cd $DIR/porcupine
if [ ! -d ".venv" ]; then
  echo "Need to setup Python env..."
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -U pip
  pip install -r requirements.txt
  pip list
else
  echo "Python environment already exists."
fi

echo
echo

# Setup NodeJS environment
#
cd $DIR/command-processor
if [ ! -d "node_modules" ]; then
  echo "Need to install NodeJS modules..."
  npm install
else
  echo "NodeJS modules appear to be already installed."
fi

npm start
