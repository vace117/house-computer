const STANDARD_COMPUTER_BEEP = 'sounds/computerbeep_31.mp3'
const LIGHT_COMMANDS_ROOT = '/home/val/command_scripts'

module.exports = {

  TEN_FORWARD_LIGHTS_OFF: {
    sound: STANDARD_COMPUTER_BEEP,
    script: `${LIGHT_COMMANDS_ROOT}/lights_off.sh`
  },

  TEN_FORWARD_LIGHTS_DIM: {
    sound: STANDARD_COMPUTER_BEEP,
    script: `${LIGHT_COMMANDS_ROOT}/chill.sh`
  },

  TEN_FORWARD_LIGHTS_FULL: {
    sound: STANDARD_COMPUTER_BEEP,
    script: `${LIGHT_COMMANDS_ROOT}/relax.sh`
  },

  TEN_FORWARD_PORT_LIGHTS_OFF: {
    sound: STANDARD_COMPUTER_BEEP,
    script: `${LIGHT_COMMANDS_ROOT}/port_strip_off.sh`
  },

  TEN_FORWARD_PORT_LIGHTS_ON: {
    sound: STANDARD_COMPUTER_BEEP,
    script: `${LIGHT_COMMANDS_ROOT}/port_strip_on.sh`
  },

  TEN_FORWARD_STARBOARD_LIGHTS_OFF: {
    sound: STANDARD_COMPUTER_BEEP,
    script: `${LIGHT_COMMANDS_ROOT}/starboard_strip_off.sh`
  },

  TEN_FORWARD_STARBOARD_LIGHTS_ON: {
    sound: STANDARD_COMPUTER_BEEP,
    script: `${LIGHT_COMMANDS_ROOT}/starboard_strip_on.sh`
  },

  TEN_FORWARD_NIGHT_MODE_ON: {
    sound: STANDARD_COMPUTER_BEEP,
    script: `${LIGHT_COMMANDS_ROOT}/night_mode_on.sh`
  },

  TEN_FORWARD_NIGHT_MODE_OFF: {
    sound: STANDARD_COMPUTER_BEEP,
    script: `${LIGHT_COMMANDS_ROOT}/night_mode_off.sh`
  },

  RED_ALERT: {
    sound: 'sounds/tng_red_alert1.mp3',
    script: `${LIGHT_COMMANDS_ROOT}/red_alert.sh`
  },

  DANCE_ALERT: {
    sound: 'sounds/Faderhead - TZDV.mp3'
  },

  PARTY_TIME: {
    sound: 'sounds/VITALIC - Poison Lips.mp3'
  }

}
