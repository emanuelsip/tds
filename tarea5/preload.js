const {ipcRenderer,contextBridge} = require('electron')



let functions = {guardar:(datos) =>ipcRenderer.send('guardar',datos),
                 consultar:(callback) =>ipcRenderer.send('consultar',callback),
                 respuestaconsulta:(callback) =>ipcRenderer.on('respuestaconsulta',callback),
                 setfecha:(callback) =>ipcRenderer.on('setfecha',callback),
}
contextBridge.exposeInMainWorld('comunicacion',functions);


