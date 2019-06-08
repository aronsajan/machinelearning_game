const electron = require('electron');
browserWin = electron.BrowserWindow;
app = electron.app;

function startApp(){
    mainWindow = new browserWin({width:1250, height:500, webPreferences: {
        nodeIntegration: true
      }})
    mainWindow.loadFile('start.html')
}

app.on("ready", startApp)