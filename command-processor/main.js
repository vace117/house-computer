// Set logging format
//
require('log-timestamp')( () => {
    return `[${new Date().toLocaleString("en-CA")}]`
});

// Prepare MP3 Player
//
const mp3Player = require('play-sound')( {
  player: 'play'
})



// Launch Porcupine
//
const { spawn } = require('child_process')
console.log("Launching Porcupine...")

const porcupine = spawn("../porcupine/bin/start_porcupine.sh");
porcupine.stdout.on('data', (data) => {
  console.log(`Porcupine stdout: ${data}`);
});
porcupine.stderr.on('data', (data) => {
  console.error(`Porcupine stderr: ${data}`);
});
porcupine.on('close', (code) => {
  console.log(`Porcupine exited with code ${code}`);
});

require('system-sleep')(2000); // Sleep for a bit
console.log('\n\n\n\n')
console.log("Porcupine is listening.")



// Prepare the house controller, which executes textual commands
//
const DA_HAUZ = require('./controller/house-controller')

// Prepare Google Speech-to-text API
//
const GoogleSpeechRecognizer = require('./google-speech/GoogleSpeech');

// Setup our callback for when a command has been recognized
//
const google = new GoogleSpeechRecognizer( commandText => {
  console.log(`Command received: "${commandText}"`)

  // Execute the command!
  //
  DA_HAUZ.processCommand(commandText)
  
  console.log("HouseController standing by...")
})

// Launch REST server that awaits a command from Porcupine. 
// When received, Google Speech-to-text recognition is kicked off.
//
require('./rest/rest-server') ( '/HAUZ', () => {
    // Acknowledge wake up
    //
    console.log("YES, MASTER?");
    mp3Player.play('sounds/computerbeep_34.mp3')

    // Start Google Speech-to-text recognition
    // 
    google.startStreaming();
  }
)