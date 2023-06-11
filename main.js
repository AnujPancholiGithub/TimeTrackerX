const { app, BrowserWindow } = require("electron");

const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Electron",
    width: 1000,
    height: 600,

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  mainWindow.webContents.openDevTools();

  const startUrl = new URL(
    "file://" + path.join(__dirname, "./myapp/build/index.html")
  ).href;

  mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);
