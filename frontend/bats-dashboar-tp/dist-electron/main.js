import { app, BrowserWindow } from "electron";
function createWindow() {
  const win = new BrowserWindow({
    width: 1450,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
      //  preload: path.join(__dirname, 'preload.js'), 
    }
  });
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  }
}
app.whenReady().then(createWindow);
