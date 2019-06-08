const util = require('util');
const events = require('events');
const CactusEvents = require('./cactusEvents.js');
const uuid = require('uuid/v1')

function Cactus(canvas){
    self = this;
    self.id = uuid();
    self.canvas = canvas;
    self.cactusImg = new Image();
    self.cactusImg.src='./resources/cactus.png';
    self.POSX=1200;
    //self.cactusEvents = CactusEvents
    return self
}

util.inherits(Cactus, events);


Cactus.prototype.clock = function(self){
    self.POSX-=1; 
    self.show(self);
    self.emit('Cactus.Moved',self.id, self.POSX, 240, self.POSX+100, 440)
}

Cactus.prototype.show = function(self){
    self.canvas.beginPath()
    self.canvas.drawImage(self.cactusImg, self.POSX, 240, 100, 200);
    self.canvas.closePath()
}


module.exports = Cactus