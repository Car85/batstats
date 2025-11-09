"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (channel, data) => {
    electron.ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    electron.ipcRenderer.on(channel, (event, data) => callback(data));
  }
});
