#!/bin/bash

docker rm house-computer &> /dev/null

docker run -it \
    -v "$HOME:$HOME" \
    -v $XDG_RUNTIME_DIR/pulse:$XDG_RUNTIME_DIR/pulse \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e PULSE_SERVER=unix:$XDG_RUNTIME_DIR/pulse/native \
    --device /dev/snd \
    --user $(id -u) \
    --network host \
    --name house-computer \
    vace117/house-computer
