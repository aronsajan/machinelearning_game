
 const SystemPulse = require("./systemPulse.js")
 const bgManager = require("./backgroundManager.js")
 const ball = require("./ball.js")
 const InputManager = require('../InputController/InputManager.js')
 const InputDevices = require('../InputController/InputDevices.js')
 const CactusController = require('./cactusController.js')
 const util = require('util');
const events = require('events');
const CSVWriter = require('csv-writer').createObjectCsvWriter;
const uuid = require('uuid/v1')

var self
function MainController(canvas, canvas_element, document){
    self = this;
    this.canvas = canvas;
 self.document = document;
 self.canvas_element = canvas_element;
 self.ipManager = new InputManager();
 self.ipManager.registerInputDevice(document, InputDevices.KEYBOARD);
 self.csvWriter = CSVWriter({
    path:'./callibration_'+uuid()+'.csv',
    header:[{
        id:'distance',
        title:'DistanceToObj'
    },{
        id:'success',
        title:'Success'
    }]
});
}



util.inherits(MainController, events)


MainController.prototype.saveAnalytics = function(analytic_data){
    self.csvWriter.writeRecords(analytic_data).then(() => {
        alert('Analytics Saved');
    });
}

MainController.prototype.start = function(){
    sysPulse = new SystemPulse(10)
    bgMgr = new bgManager(sysPulse, self.canvas, self.canvas_element.width, self.canvas_element.height);
    ballCtrl = new ball(sysPulse, self,  self.canvas, self.ipManager)
    cactusCtrl = new CactusController(sysPulse, self, self.canvas)
    sysPulse.startPulse();
}

module.exports = MainController