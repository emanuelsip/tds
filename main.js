const {app, BrowserWindow} = require('electron');

function createWindow(){
    const ventana = new BrowserWindow({
        width: 300,
        height: 300
    });
    ventana.loadFile('index.html');
}
app.whenReady().then(createWindow);