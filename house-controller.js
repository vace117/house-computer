const { spawnSync } = require( 'child_process' )

const mp3Player = require('play-sound')({
    player: 'play'
})

const _ = require('underscore')

const COMMANDS = require('./commands')

module.exports = {
    processCommand: (commandText) => {
      
      const commandData = COMMANDS[commandText.toLowerCase()];
      if ( !_.isEmpty(commandData) ) {
        if ( commandData.sound ) {
          mp3Player.play(commandData.sound)
        }

        if ( commandData.script ) {
          console.log(`    Executing: ${commandData.script}`);
          spawnSync(commandData.script);
        }
      }
      else {
        console.log("    Not sure what to do...")
        mp3Player.play('sounds/denybeep1.mp3')        
      }
      
    }
}