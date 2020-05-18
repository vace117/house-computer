/******************************************************************************
 * Dumps microphone data stream into Google Speech Cloud API, when told to do so. 
 * 
 * Disconnects after first full transcription.
 ******************************************************************************/
'use strict';

// Provides the microphone stream
//
const record = require('node-record-lpcm16')

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

    // Open a stream from the microphone
    //
    this.microphoneStream = record.start({
        threshold: 0.5,
        verbose: true
    });
    
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
      
        this.recognitionStream = this.speechClient
            .streamingRecognize(request)
            .on('error', err => {
                console.error(`ERROR initializing a stream to Google Cloud service: ${err}`)
                stopStream(this)
            })
            .on('data', data => {
                if (data.results[0] && data.results[0].alternatives[0]) {
                    
                    console.debug("DEBUG: " + JSON.stringify(data) );

                    if (data.error) {
                        console.error(`ERROR from Google Cloud: ${data.error}`)
                        
                        stopStream(this)
                    } else if (data.results[0].isFinal) {
                        // Callback with recognized text
                        //
                        this.recognizedTextCallback(data.results[0].alternatives[0].transcript)
                        stopStream(this)
                    }
                
                }
            }
        )

        /**
         * Call this to stop recognition and disconnect from Google Cloud Service
         */
        const stopStream = function( recognizer ) {
            recognizer.streamingInd = false
            recognizer.microphoneStream.unpipe(recognizer.recognitionStream)
            recognizer.recognitionStream.end()
        }

        // Dump microphone data into Google Speech recognizer
        //
        this.microphoneStream.pipe(this.recognitionStream);
    }
}

module.exports = GoogleSpeechRecognizer