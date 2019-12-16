const { spawnSync } = require( 'child_process' )

const mp3Player = require('play-sound')({
    player: 'play'
})

const _ = require('underscore')

const COMMANDS = require('./command-definitions')

module.exports = {
    processCommand: (commandText) => {
      
      const commandData = COMMANDS[commandText];
      if ( !_.isEmpty(commandData) ) {
        console.log(`    Executing: ${commandData.script}`);
        mp3Player.play(commandData.sound)
        spawnSync(commandData.script);
      }
      else {
        console.log("    Not sure what to do...")
        mp3Player.play('sounds/denybeep1.mp3')        
      }
      
    }
}