import { app, BrowserWindow } from 'electron';
//import path from 'path';
//import { fileURLToPath } from 'url';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1450,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    //  preload: path.join(__dirname, 'preload.js'), 
    },
  });

  if (process.env.NODE_ENV === 'development') {
   win.loadURL('http://localhost:5173');
   // win.webContents.openDevTools();
  } 
}

app.whenReady().then(createWindow);

