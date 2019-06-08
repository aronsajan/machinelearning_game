
const InputEvents = require('./InputEvents')


var self
function KeyboardController(ipProvider, inputCoordinator){
    self = this
    self.ipProvider = ipProvider
    self.ipCoord = inputCoordinator
}

KeyboardController.prototype.registerEvents= function(){
    self.ipProvider.addEventListener('keydown', self.onkeyDown)
}

KeyboardController.prototype.onkeyDown = function(evt){
    var action 
    if (evt.keyCode in keyMaps){
        action = keyMaps[evt.keyCode]
        self.ipCoord.emit(action)
    }
}

keyMaps = {
    32 : InputEvents.Jump,
    38 : InputEvents.Jump
}

module.exports = KeyboardController