FROM ubuntu:bionic

# Install Python things
RUN apt-get update && apt-get install -y \
        apt-utils vim tree \
        portaudio19-dev python-pyaudio python3-pyaudio python3-venv python3-dev

# Install NodeJS and some audio dependencies
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs libatlas-base-dev sox
#################

# Install ALSA things. We need it b/c PyAudio only works with ALSA. We'll actually be using 
# PulseAudio's ALSA plugin to make sure we can share audio resources with the rest of the system
#
RUN apt-get install -y alsa-utils libasound2-dev libsndfile1 
#################

# Install PulseAudio things
RUN apt-get install -y pulseaudio pulseaudio-utils libpulse-dev libsox-fmt-mp3
#################

# Cleanup
#
RUN rm -rf /var/lib/apt/lists/*
#################

# Configure PulseAudio server not to run on startup. 
# We'll be using the hosts' server instead
# 
COPY docker/client.conf /etc/pulse/client.conf

# This should match the host's user (both name and ID), or PulseAudio won't work.
#
RUN groupadd -g 1000 val
RUN useradd -g val -G audio -u 1000 val

ENV PROJECT_DIR="/opt/house-computer"
RUN mkdir ${PROJECT_DIR} && chown -R val:val ${PROJECT_DIR}
USER val
WORKDIR ${PROJECT_DIR}

COPY command-processor ${PROJECT_DIR}/command-processor
COPY porcupine ${PROJECT_DIR}/porcupine
COPY README.md ${PROJECT_DIR}
COPY docker/entrypoint.sh ${PROJECT_DIR}

ENTRYPOINT ${PROJECT_DIR}/entrypoint.sh