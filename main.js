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

// The house controller, which acts upon textual commands
//
const DA_HAUZ = require('./controller/house-controller')

// Setup voice command processing using Google's Speech cloud service
//
const GoogleSpeechRecognizer = require('./google-speech/GoogleSpeech');
const google = new GoogleSpeechRecognizer( commandText => {
  console.log(`Command received: "${commandText}"`)

  DA_HAUZ.processCommand(commandText)  
  
  console.log("HouseController standing by...")
})

// REST server that awaits a command from Porcupine. 
// When received, Google Speech recognition is kicked off.
//
require('./rest/rest-server') ( '/HAUZ', 
  () => {
    console.log("YES, MASTER?");

    mp3Player.play('sounds/computerbeep_34.mp3')

    google.startStreaming();
  }
)

