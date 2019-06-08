const util = require('util')
const events = require('events')


var self;

function SystemPulse(interval){
    self = this
    self.interval = interval;
}

util.inherits(SystemPulse, events)

SystemPulse.prototype.masterClock = function(){
    self.emit('pulse')
}

SystemPulse.prototype.startPulse = function(){
  self.timerHandle = setInterval(self.masterClock, self.interval)
}

SystemPulse.prototype.stopPulse = function(){
    clearInterval(self.timerHandle)
}

module.exports = SystemPulse;