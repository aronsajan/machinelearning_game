
var self;
function bgManager(sysclock, canvas, size_x, size_y){
    self = this
    self.canvas = canvas;
    self.backgroundImg = new Image();
   
    self.backgroundImg.src="./resources/ground_sprite.png";
    self.startX=0;
    self.startY=0;
    self.img_height=size_y;
    self.img_width = size_x

    self.SHIFT_OFFSET = 5
    sysclock.on('pulse', self.pscroll)

}

bgManager.prototype.show = function(){
    self.canvas.drawImage(self.backgroundImg, self.startX, self.startY, self.img_width, self.img_height);
    self.canvas.drawImage(self.backgroundImg, self.startX+self.img_width, self.startY, self.img_width, self.img_height);
}

bgManager.prototype.pscroll = function(){
    self.startX -= self.SHIFT_OFFSET
    self.endX -= self.SHIFT_OFFSET
    if (self.startX <= (-1*self.img_width)){
        self.startX = 0
        self.endX = self.img_width
    }
    self.show()
}

module.exports = bgManager