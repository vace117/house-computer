require('log-timestamp')( () => {
    return `[${new Date().toLocaleString("en-CA")}]`
});

const Sonus = require('sonus')
const speech = require('@google-cloud/speech')
const client = new speech.SpeechClient()

const hotwords = [{ 
    file: 'models/computer.pmdl', 
    hotword: 'computer', 
    sensitivity: 0.4
}]
const sonus = Sonus.init({ hotwords }, client)

const mp3Player = require('play-sound')({
    player: 'play'
})

const HouseController = require('./house-controller')

Sonus.start(sonus)

sonus
    .on('hotword', (index, hotword) => {
        console.log("YES, MASTER?");
        mp3Player.play('sounds/computerbeep_34.mp3')
    })

    .on('final-result', commandText => {
        console.log(`Command received: \"${commandText}\"`)

        HouseController.processCommand(commandText)

        console.log("Listening for hotword...")
    })

    .on('error', console.log);


console.log("Listening for hotword...")