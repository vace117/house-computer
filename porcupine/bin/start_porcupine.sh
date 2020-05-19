#!/bin/bash

cd $PROJECT_DIR/porcupine
source .venv/bin/activate

echo "Python environment initialized to:"
python --version
echo
pip list

python house_computer.py --keywords computer