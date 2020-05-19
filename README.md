# House Computer
The goal of this project is to provide offline wake word detection, combined with cloud-powered arbitrary voice command processing, combined with a controller that can process and execute home automation tasks based on textual commands.

## PulseAudio Setup
You'll need to make sure that the user name and uid specified in `Dockerfile` matches the user you are logged in as. If you don't do this, PulseAudio will not work, so make sure you do this before building the Docker image.

## Usage
When you checkout this repository for the first time, you'll need to build the Docker image:

```
$ docker build -t vace117/house-computer .
```

All subsequent times, just run:
```
$ ./start_house_computer.sh
```

This command will start the NodeJS Command Processor, which takes care of launching Porcupine properly.

## Offline Wake Word Detection
Is accomplished by using Porcupine's Python bindings (https://github.com/Picovoice/porcupine). 

If you wish to run Procupine manually, you can do so with this script:
```
$ porcupine/bin/start_porcupine.sh
```

For details about Python environment setup, please see [Porcupine Setup Intructions](porcupine/README.md). Note that a `venv` Python environment is already initialized and checked in, so you shouldn't really have to mess with any Python setup anymore.

Porcupine uses the microphone to listen for a trigger word. After the trigger word has been detected, it signals the NodeJS back-end via a REST call.

## Google Speech-to-text API
NodeJS server picks up the signal from Porcupine, plays an MP3 file as audible acknowledgement that it is listening, connects to Google Speech-to-text API (https://cloud.google.com/speech-to-text) and transcribes the command spoken next. The recognized command text is passed into the house controller for execution.
