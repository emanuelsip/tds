const {ipcRenderer,contextBridge} = require('electron')



let functions = {peticion:(datos) =>ipcRenderer.send('peticion',datos),
                 obtenerdatos:(callback) =>ipcRenderer.on('obtenerdatos',callback)
}
contextBridge.exposeInMainWorld('comunicacion',functions);


