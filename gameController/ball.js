
const InputEvents = require('../InputController/InputEvents');
var self
function ball(sysclock, mainCtrl, canvas, ipManager){
 self = this;
 self.sysClock = sysclock
 self.mainCtrl = mainCtrl
 self.POSX = 50;
 self.POSY = 360;
 self.BALLWIDTH = 64;
 self.BALLHEIGHT = 64;
 self.ballSprite = new Image()
 self.ballSprite.src="./resources/poke_ball_sprite.png"
 self.canvas = canvas
 self.clipX=0
 self.clipY=0
 self.clockTick=0
 self.distanceTravelled = 0
 self.ipManager = ipManager
 self.registerEvents();
 self.jumpState = 'Stop'
 self.mainCtrl.on('Cactus.Moved', self.onCactusMoved)
 sysclock.on('pulse', self.clock)
 self.analytics = []
 self.distanceObj = -1
 self.success = false;
 self.closestObject = null;
 self.cactusXMap = {}
 self.ballX = self.POSX+self.BALLWIDTH - 30
}

function closestObject(){
    nearestCactusPos = 1200
    nearestCactusId = null;
    for (var id in self.cactusXMap){
        if (self.cactusXMap[id]['start'] < nearestCactusPos){
            nearestCactusPos = self.cactusXMap[id]['start'];
            nearestCactusId = id;
        }
    }
    return nearestCactusId;
}

jumpStates = new Set(['Start', 'Jumping', 'Falling']);

ball.prototype.onCactusMoved = function(cactusId, startX, startY, endX, endY){
    
    if(startX > self.POSX){
        if ((cactusId in self.cactusXMap) == false){
            self.cactusXMap[cactusId] = {}
        }
        self.cactusXMap[cactusId]['start'] = startX;
        self.cactusXMap[cactusId]['end'] = endX;
        
    }
    else {
        if (cactusId in self.cactusXMap){
            self.analytics.push({'distance':self.distanceObj, 'success': true});
            self.distanceObj = -1;
            delete self.cactusXMap[cactusId];
        }
    }
    
    if ((self.ballX> startX) && (self.ballX<endX) && (self.POSY> startY) && (self.POSY<endY)){
        alert('Game Over');
        self.analytics.push({'distance':self.distanceObj, 'success': false});
        self.sysClock.stopPulse();
        self.mainCtrl.saveAnalytics(self.analytics);
    }
}

ball.prototype.jumpSequence = function(){
    switch(self.jumpState){
        case 'Start':
            self.jumpStartY = self.POSY
            self.jumpState = 'Jumping'
            closestObj = closestObject();
            if (closestObj!=null){
                nearestCactusPos = self.cactusXMap[closestObj]['start'];
                self.closestObj = closestObj;
                self.distanceObj = nearestCactusPos - self.ballX;
            }
            break;
        case 'Jumping':
            self.POSY-=5
            if ((self.jumpStartY - self.POSY)>250){
                self.jumpState = 'Falling'
            }
            break;
        case 'Falling':
            self.POSY+=1
            if ((self.jumpStartY - self.POSY)==0){
                self.jumpState = 'Stop'
            }
        case 'Stop':
            break;

    }
}


ball.prototype.registerEvents = function(){
    self.ipManager.on(InputEvents.Jump, self.onJump)
}

ball.prototype.onJump = function(){
    if (self.jumpState=='Stop'){
        self.jumpState='Start'
    }
}


ball.prototype.clock = function(){
    self.clockTick+=1;
    self.distanceTravelled+=1;
    if (self.clockTick==2){
        self.clockTick = 0;
        self.spin();
       
    }
    self.jumpSequence()
    self.show();
}

ball.prototype.spin = function(){
 self.clipX+=64
 if(self.clipX>=768){
     self.clipX = 0
 }

}

ball.prototype.show = function(){
    self.canvas.drawImage(self.ballSprite, 
        self.clipX,
         0, 
         self.BALLWIDTH,
         self.BALLHEIGHT,
         self.POSX, 
         self.POSY, 
         self.BALLWIDTH,
         self.BALLHEIGHT);
}

module.exports = ball