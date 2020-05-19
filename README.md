# House Computer
The goal of this project is to provide offline wake word detection, combined with cloud-powered arbitrary voice command processing, combined with a controller that can process and execute home automation tasks based on textual commands.

## Offline Wake Word Detection
Is accomplished by using Porcupine's Python bindings (https://github.com/Picovoice/porcupine). 

This part of the project is executed by the following script:
```
$ porcupine/bin/start_porcupine.sh
```

For details about the Python setup, please see [Porcupine Setup Intructions](porcupine/README.md).

Porcupine uses the microphone to listen for a trigger word. After the trigger word has been detected, it signals the NodeJS back-end via a REST call.

## Google Speech-to-text API
NodeJS server picks up the signal from Porcupine, plays an MP3 file as audible acknowledgement that it is listening, connects to Google Speech-to-text API (https://cloud.google.com/speech-to-text) and transcribes the command spoken next. The recognized command text is passed into the house controller for execution.

## Setup
When you checkout this repository for the first time, you'll need to build the Docker image:

```
$ docker build -t vace117/house-computer .
```

All subsequent times, just run:
```
$ ./start_house_computer.sh
```