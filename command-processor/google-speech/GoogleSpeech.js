/******************************************************************************
 * Dumps microphone data stream into Google Speech Cloud API, when told to do so. 
 * 
 * Disconnects after first full transcription.
 ******************************************************************************/
'use strict';

const debugGoogle = require('debug')('hauz:google')
const debugMic    = require('debug')('hauz:mic')

// Provides the microphone stream
//
const microphone = require('node-record-lpcm16')

// Provides the voice-to-text service from Google Cloud
//
const speech = require('@google-cloud/speech')

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
      
        const request = {
          config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
            speechContexts: null // This is cool! Check out https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig#SpeechContext
          },
          singleUtterance: true,
          interimResults: false,
        }
      
        const recognitionStream = this.speechClient
            .streamingRecognize(request)
            .on('error', err => {
                console.error(`ERROR: initializing a stream to Google Cloud service: ${err}`)
                stopStream()
            })
            .on('data', data => {
                if (data.results[0] && data.results[0].alternatives[0]) {
                    debugGoogle(JSON.stringify(data));

                    if (data.error) {
                        console.error(`ERROR from Google Cloud: ${data.error}`)
                        
                        stopStream()
                    } else if (data.results[0].isFinal) {
                        // Callback with recognized text
                        //
                        this.recognizedTextCallback(data.results[0].alternatives[0].transcript)
                        stopStream()
                    }
                }
            }
        )

        // Init the microphone
        //
        debugMic('Initializing microphone...')
        const microphoneRecorder = microphone.record({
            threshold: 0.5,
            recorder: 'rec'
        });

        // Send microphone data into Google Speech recognizer
        //
        debugMic('Sending microphone data to Google Cloud...')
        const microphoneStream = microphoneRecorder
                .stream()
                .on('error', console.error)
                .pipe(recognitionStream);

        /**
         * Call this to stop recognition and disconnect from Google Cloud
         */
        const stopStream = () => {
            this.streamingInd = false;
            debugGoogle('Terminating cloud connection...');
            microphoneStream.unpipe(recognitionStream);
            recognitionStream.end();

            debugMic('Releasing the microphone...');
            microphoneRecorder.stop();
        }

    }
}

module.exports = GoogleSpeechRecognizer