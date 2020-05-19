/******************************************************************************
 * Provides the REST server that Porcupine talks to.
 ******************************************************************************/
'use strict';

/**
 * Shared secret with the client. This number needs to be in the POST body
 * in order for command recognition to be initiated
 */
const ACTIVATE_GOOGLE_SPEECH = "758383758402746"

// Port we listen on
//
const PORT = 6666;

function RESTServer( url, initiateCommandRecognitionCallback ) {
    // Configure the server
    //
    const express = require('express')
    const server = express()

    server.use(express.text()) // Decode body as text

    server.post(url, (req, res) => {
        if ( ACTIVATE_GOOGLE_SPEECH == req.body ) {
            initiateCommandRecognitionCallback();

            return res.send('OK');
        }
        else {
            console.log(`Suspicious command received: '${req.body}'!`)
            return res.send('Fuck off')
        }  
    });
    

    // Run the server
    //
    server.listen(PORT, () => {
        console.log(`House Command Processor is fully operational on port ${PORT}.`);
        console.log("HouseController standing by...");
    });

}

module.exports = RESTServer;