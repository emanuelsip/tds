const {ipcRenderer,contextBridge} = require('electron')



let functions = {registroValidacion:(datos) =>ipcRenderer.send('registroValidacion',datos),
                 validacionUsuario:(callback) =>ipcRenderer.on('validacionUsuario',callback)
}
contextBridge.exposeInMainWorld('comunicacion',functions);
