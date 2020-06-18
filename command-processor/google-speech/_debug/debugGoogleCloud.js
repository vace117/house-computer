/******************************************************************************
 * Use this for debugging Google Cloud functionality in isolation from the rest of the system
 ******************************************************************************/
'use strict';


// Set logging format
//
require('log-timestamp')( () => {
    return `[${new Date().toLocaleString("en-CA")}]`
});


// Prepare Google Speech-to-text API
//
const GoogleSpeechRecognizer = require('../GoogleSpeech');

// Setup our callback for when a command has been recognized
//
const google = new GoogleSpeechRecognizer( commandText => {
  console.log(`Command received: "${commandText}"`)
 
  console.log("HouseController standing by...")
})


// Start Google Speech-to-text recognition
// 
google.startStreaming();
