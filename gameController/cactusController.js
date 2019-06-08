const Cactus = require('./cactus.js')
const events = require('events')
const util = require('util')

var self
function CactusController(sysclock, mainCtrl, canvas){
    self = this
    self.mainCtrl = mainCtrl
    self.controllerClock = 0
    self.canvas = canvas;
    self.cactusMap = {};
    self.counter = 0;
    sysclock.on('pulse', self.clock)
}

util.inherits(CactusController, events)

CactusController.prototype.clock = function(){
    self.controllerClock+=1;
    if (self.controllerClock == 500){
        self.controllerClock = 0;
        if (Math.round(Math.random()*10000)%2==0){
            cactus = new Cactus(self.canvas)
            cactus.on('Cactus.Moved', function(id, startx, starty, endx, endy){
                self.mainCtrl.emit('Cactus.Moved', id, startx, starty, endx, endy)
                if (startx<0){
                    delete self.cactusMap[id]
                }
            })
            self.cactusMap[cactus.id] = cactus
            console.log(Object.keys(self.cactusMap).length)
        }
    }
   
   for (var key in self.cactusMap){
       cactusObj = self.cactusMap[key];
       cactusObj.clock(cactusObj);
   }

}

module.exports = CactusController

