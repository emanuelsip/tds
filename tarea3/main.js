const {app, BrowserWindow, ipcMain} = require('electron');
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
    let mails = ['correo@correo.com',
                 'correo1@test.com',
                 'correo2@test.com',
                 'correo2@test.com',
                 'correo2@test.com'];
    console.log(mails.includes(args));
    if(mails.includes(args) !==false){
        ventana.webContents.send('validacionUsuario',true);
    }else
        ventana.webContents.send('validacionUsuario',false);
    console.log(args);
})
app.whenReady().then(createWindow);


