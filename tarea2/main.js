const {app, BrowserWindow,ipcMain} = require('electron');
const path = require('path');
let ventana;
function createWindow(){
    ventana = new BrowserWindow({
        width: 550,
        height: 400,
        webPreferences:{
            preload: path.join(app.getAppPath(),'preload.js')
        }
    });
    ventana.loadFile('index.html');
}
ipcMain.on('registroValidacion',(event,args)=>{
    let mails = ['correo1@test.com',
                 'correo2@test.com',
                 'correo2@test.com',
                 'correo2@test.com'];
    alert(mails);
})
app.whenReady().then(createWindow);