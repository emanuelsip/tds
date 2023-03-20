const {app, BrowserWindow} = require('electron');

function createWindow(){
    const ventana = new BrowserWindow({
        width: 1020,
        height: 720
    });
    ventana.loadFile('index.html');
}
app.whenReady().then(createWindow);