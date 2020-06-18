/******************************************************************************
 * Dumps microphone data stream into Google Speech Cloud API, when told to do so. 
 * 
 * Disconnects after first full transcription.
 ******************************************************************************/
'use strict';

// Current cloud session will be terminated if it doesn't complete within
// this amount of time
//
const SPEECH_RECOGNITION_TIMEOUT_MILLIS = 7000;

const debugGoogle = require('debug')('hauz:google')
const debugMic    = require('debug')('hauz:mic')

// Provides the microphone stream
//
const microphone = require('node-record-lpcm16')

// Provides the voice-to-text service from Google Cloud
//
const speech = require('@google-cloud/speech').v1p1beta1

/**
 * Constructor
 */
function GoogleSpeechRecognizer( recognizedTextCallback ) {
    this.recognizedTextCallback = recognizedTextCallback;

    // Google Client API
    //
    this.speechClient = new speech.SpeechClient();

    // Keep track of whether we are currently streaming our sound into the cloud
    //
    this.streamingInd = false;
}

/**
 * Call this method when you want to connect to Google Speech and start recognition
 */
GoogleSpeechRecognizer.prototype.startStreaming = function() {
    if (!this.streamingInd) {
        this.streamingInd = true
      
        _startRecording.call(this);
        _connectToGoogleCloud.call(this);
        _sendAudioToGoogleCloud.call(this);
    }
}

/**
 * Call this to stop recognition and disconnect from Google Cloud
 */
GoogleSpeechRecognizer.prototype.stopStreaming = function() {
    this.streamingInd = false;

    debugMic('Terminating audio recording...');
    this.microphoneRecorder.stop();
}


/**
 * Init the microphone and start recording
 */
function _startRecording() {
    debugMic('Initializing microphone...')
    
    this.microphoneRecorder = microphone.record({
        threshold: 0.5,
        recorder: 'rec'
    });

    this.microphoneRecorder.stream()
            .on('error', console.error)
            .on('close', () => debugMic("Microphone stream is now closed"))
}

/**
 * Create a writable stream to Google Cloud Speech Recognizer
 */
function _connectToGoogleCloud() {
    debugGoogle('Connecting to Google Cloud...')
    
    const request = {
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          model: 'command_and_search',
          metadata: {
              interactionType:     'VOICE_COMMAND',
              microphoneDistance:  'FARFIELD',
              recordingDeviceType: 'PC'
          }
        },
        singleUtterance: true,
        interimResults: false,
      }

    this.recognitionStream = this.speechClient
        .streamingRecognize(request)
        .on('error', err => {
            console.error(`ERROR EVENT from Google Cloud stream: ${err}`)
            this.stopStreaming()
        })
        .on('data', data => {
            debugGoogle(JSON.stringify(data));

            if (data.error) {
                this.stopStreaming()

                console.error(`ERROR DATA from Google Cloud stream: ${data.error}`)
            }
            else if (data.results[0] && data.results[0].isFinal && data.results[0].alternatives[0]) {
                this.stopStreaming()

                // Callback with recognized text
                //
                this.recognizedTextCallback(data.results[0].alternatives[0].transcript)
            }
        })
        .on('pipe', () => {
            console.log('Google is processing command audio...');
        })
        .on('finish', () => {
            debugGoogle("Final data written into Google Cloud")
            console.log('Google connection terminated.');
        })
}

/**
 * Send microphone data into Google Speech recognizer
 */
function _sendAudioToGoogleCloud() {
    debugMic('Sending microphone data to Google Cloud...')
    this.microphoneRecorder.stream().pipe(this.recognitionStream);

    _startGoogleTimeoutTimer.call(this);
}

/**
 * Google stream frequently does not return a result at all, and then we are
 * stuck waiting for a timeout, which seems to be around a minute. 
 * Тhis timer works around the problem by force-closing the stream if it hasn't
 * come back after an allotted amount of time.
 */
function _startGoogleTimeoutTimer() {
    setTimeout( () => {
        if ( this.streamingInd ) {
            console.log("Terminating current command b/c it seems to be hanging...")
            this.stopStreaming();

            this.recognizedTextCallback("COMMAND RECOGNITION ERROR");
        }
    }, SPEECH_RECOGNITION_TIMEOUT_MILLIS);
}




module.exports = GoogleSpeechRecognizer