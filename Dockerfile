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
ARG USER_NAME="val"
ARG USER_ID=1000

RUN groupadd -g ${USER_ID} ${USER_NAME}
RUN useradd -g ${USER_NAME} -G audio -u ${USER_ID} ${USER_NAME}

COPY docker/entrypoint.sh /tmp

USER ${USER_NAME}
WORKDIR /home/${USER_NAME}

ENTRYPOINT /tmp/entrypoint.sh
