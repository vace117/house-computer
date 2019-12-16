require('log-timestamp')( () => {
    return `[${new Date().toLocaleString("en-CA")}]`
});

const Sonus = require('sonus')
const speech = require('@google-cloud/speech')
const client = new speech.SpeechClient()

const hotwords = [{ file: 'models/computer.pmdl', hotword: 'computer' }]
const sonus = Sonus.init({ hotwords }, client)

Sonus.start(sonus)
console.log("Listing for keyword...")
sonus.on('hotword', (index, keyword) => console.log("YES, MASTER?"))
sonus.on('final-result', recognizedCommand => console.log(recognizedCommand))
sonus.on('error', console.log)
