const {app, BrowserWindow} = require('electron');

function createWindow(){
    const ventana = new BrowserWindow({
        width: 500,
        height: 400
    });
    ventana.loadFile('index.html');
}
app.whenReady().then(createWindow);