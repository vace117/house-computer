#!/bin/bash

DIR=`dirname "$(readlink -f "$0")"`

cd "$DIR/.."
source .venv/bin/activate

echo "Python environment initialized to:"
python --version
echo
pip list

python house_computer.py --keywords computer
