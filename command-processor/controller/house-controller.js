/**
 * This is The House. 
 * 
 * Accepts textual commands and executes them for realz. 
 */

'use strict';

const _ = require('underscore')

// Worker processes are forked
//
const { spawnSync } = require( 'child_process' )

// MP3 Player
//
const mp3Player = require('play-sound')({
    player: 'play'
})


const COMMANDS = require('./commands')

var notSureWhatToDoAlreadyPlayed = false;

module.exports = {
    processCommand: (commandText) => {
      
      const commandData = COMMANDS[commandText.toLowerCase()];
      if ( !_.isEmpty(commandData) ) {
        mp3Player.play('sounds/computerbeep_13.mp3')

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

        // This is basically a latch that prevents double-sound when we get here
        // b/c of 2 events happening at the same time - watchdog timeout and 
        // a partial command text from Google
        //
        if ( !notSureWhatToDoAlreadyPlayed ) {
          mp3Player.play('sounds/denybeep1_quiet.mp3')  
          notSureWhatToDoAlreadyPlayed = true;      
        }
        else {
          notSureWhatToDoAlreadyPlayed = false;
        }
      }
      
    }
}