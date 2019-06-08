
const inputDevices = require('./InputDevices.js')
const KeyboardController = require('./keyboardController.js')
const util = require('util')
const events = require('events')
var self
function InputManager(){
    self = this
}

util.inherits(InputManager, events)

InputManager.prototype.registerInputDevice = function(inputProvider, inputDevice){
    switch(inputDevice){
        case inputDevices.KEYBOARD:
            keyCtrl = new KeyboardController(inputProvider, self)
            keyCtrl.registerEvents()
            break;
    }
}

module.exports = InputManager