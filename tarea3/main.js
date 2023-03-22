const { Console, log } = require('console');
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
function getClima(moments) {
    console.log(moments);
    const climas = ['despejado','nublado','lluvioso'];
    var climasArr = new Array();
    
    for(var i = 1; i<= (moments?3:1);i++){
        let temp = Math.floor(Math.random() * 26) + 5;
        let clime = climas[(Math.floor(Math.random() * 3) )];
        let clima = {
            temperature: temp,
            conditions: clime
        };
        climasArr.push(clima);
    }
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve(climasArr);
        }, 1000);
    });
}


ipcMain.on('peticion',async (event,args)=>{
    console.log(args);
    await getClima(args)
    .then((json)=>{
        ventana.webContents.send('obtenerdatos',json);
    }).catch((error) => {
        console.error(error);
    });
})
app.whenReady().then(createWindow);


