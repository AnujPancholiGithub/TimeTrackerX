const { app, BrowserWindow } = require("electron");

const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Electron",
    width: 1000,
    height: 600,
  });

  const startUrl = new URL("file://" + path.join(__dirname, "index.html")).href;

  mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);
