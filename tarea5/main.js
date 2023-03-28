const { Console, log } = require('console');
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const filtrosModelos = require('./filtrosModel');
const { Sequelize,DataTypes } = require('sequelize');

let ventana;
function createWindow(){
    ventana = new BrowserWindow({
        width: 1040,
        height: 720,
        webPreferences:{
            preload: path.join(app.getAppPath(),'preload.js')
        }
    });
    ventana.loadFile('index.html');
}


async function getELementos(datas) {
    // console.log(datas);
    const query = {
        where: {
          filtro: datas
        },
        attributes: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'createdAt'],
                    'resultado']
      };
      const datos = await filtrosModelos.findOne(query);
    return  datos
    
}
async function setElementos(args){
    try{
        const dataSave = await filtrosModelos.create({
            filtro: args[0],
            resultado: JSON.stringify(args[1])
        });
        // console.log(dataSave.toJSON());
    } catch (error) {
        console.error('Error creating user:', error);
    }
}
ipcMain.on('guardar',(event,args)=>{
    setElementos(args);
})
ipcMain.on('consultar',(event,args)=>{
    getELementos(args).then((d) =>{
        // console.log(d);
        // d = JSON.parse(d);
        // console.log(d.createdAt,d);
        ventana.webContents.send('respuestaconsulta',d.resultado)
        ventana.webContents.send('setfecha',d.createdAt)
    });
    
})

app.whenReady().then(createWindow);