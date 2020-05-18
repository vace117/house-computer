#!/bin/bash

# TODO: DECOMISSION!

docker run -it \
    -v "$HOME:$HOME" \
    -v $XDG_RUNTIME_DIR/pulse:$XDG_RUNTIME_DIR/pulse \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    --user $(id -u):$(id -g) \
    -e PULSE_SERVER=unix:$XDG_RUNTIME_DIR/pulse/native \
    vace117/sonus1


# Pulse instructions: https://github.com/TheBiggerGuy/docker-pulseaudio-example

# /etc/pulse/client.conf:

# Prevent a server running in the container
#autospawn = no
#daemon-binary = /bin/true
#
# Prevent the use of shared memory
#enable-shm = false
