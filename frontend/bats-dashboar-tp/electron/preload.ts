import { contextBridge, ipcRenderer } from 'electron';

// Expone APIs seguras al proceso de renderizado
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (channel: string, data: any) => {
    // Envía un mensaje al proceso principal
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel: string, callback: (data: any) => void) => {
    // Escucha mensajes del proceso principal
    ipcRenderer.on(channel, (event, data) => callback(data));
  },
});