const ACTIONS = require('./actions')

module.exports = {
    "kill the lights":      ACTIONS['TEN_FORWARD_LIGHTS_OFF'],
    "dim the lights":       ACTIONS['TEN_FORWARD_LIGHTS_DIM'],

    "lights to full power": ACTIONS['TEN_FORWARD_LIGHTS_FULL'],
    "lights to full":       ACTIONS['TEN_FORWARD_LIGHTS_FULL'],

    "port lights on":       ACTIONS['TEN_FORWARD_PORT_LIGHTS_ON'],
    "ford lights on":       ACTIONS['TEN_FORWARD_PORT_LIGHTS_ON'],
    "ford laying on":       ACTIONS['TEN_FORWARD_PORT_LIGHTS_ON'],
    "porch lights on":      ACTIONS['TEN_FORWARD_PORT_LIGHTS_ON'],

    "port lights off":      ACTIONS['TEN_FORWARD_PORT_LIGHTS_OFF'],
    "ford lights off":      ACTIONS['TEN_FORWARD_PORT_LIGHTS_OFF'],
    "porch lights off":     ACTIONS['TEN_FORWARD_PORT_LIGHTS_OFF'],

    "starboard lights off": ACTIONS['TEN_FORWARD_STARBOARD_LIGHTS_OFF'],
    "starboard lights on":  ACTIONS['TEN_FORWARD_STARBOARD_LIGHTS_ON'],

    "night mode":           ACTIONS['TEN_FORWARD_NIGHT_MODE_ON'],
    "night light":          ACTIONS['TEN_FORWARD_NIGHT_MODE_ON'],

    "night light off":      ACTIONS['TEN_FORWARD_NIGHT_MODE_OFF'],

    "red alert":            ACTIONS['RED_ALERT'],

    "dance alert":          ACTIONS['DANCE_ALERT'],

    "party time":           ACTIONS['PARTY_TIME'],

}
