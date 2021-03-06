# House Computer
The goal of this project is to provide offline wake word detection, combined with cloud-powered arbitrary voice command processing, combined with a controller that can process and execute home automation tasks based on textual commands.

## Setup
You must setup a Google Cloud account, enable Speech-to-Text API and download your `Google-API-Credentials.json` file into `command-processor/google-speech` directory. Details of the registration process are described here:
https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries

## Usage
```
$ ./start_local_house_computer.sh
```

This command will:
* Check if you already have a local `venv` Python environment setup, and if not, set it up for you in `porcupine/.venv` directory
* Check if you've already installed the necessary NodeJS modules, and if not, install them into `command-processor/node_modules`
* Start the NodeJS Command Processor, which also takes care of launching Porcupine properly.

### Using Docker
Depending on how modern/compatible your Linux system is, the above Python setup might not work for you, or maybe PyAudio won't work for you. That stuff seems super brittle...

Fear not - that is why I provide a Docker image for you to use. Everything has been tested to work in this Docker image. Here's how to run it.

#### PulseAudio Setup
You'll need to make sure that the user name and uid specified in `Dockerfile` matches the user you are logged in as. If you don't do this, PulseAudio will not work, so make sure you do this before building the Docker image.

#### Building the image
 When you checkout this repository for the first time, you'll need to build the Docker image:
```
$ docker build -t vace117/house-computer .
```

#### Running the image
All subsequent times, just run the image:
```
$ docker/start_house_computer.sh
```

This will attach your home directory to the container, so now just navigate to your project checkout directory and launch the application as before, but this time from the Docker container:
```
$ ./start_local_house_computer.sh
```

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
