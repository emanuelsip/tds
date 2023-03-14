const {ipcRenderer,contextBridge} = require('electron')



let registroValidacion = {
                            registroValidacion:(datos) => {
                                ipcRenderer.send('registroValidacion',datos)
                                alert(datos)
                            }
                        }
contextBridge.exposeInMainWorld('comunicacion',registroValidacion );
