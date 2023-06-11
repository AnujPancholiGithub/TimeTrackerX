const { app, BrowserWindow } = require("electron");

const path = require("path");
const { makeDraggable } = require("electron-drag");
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    frame: true,
    titleBarStyle: "hidden",
    titleBarOverlay: true,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startUrl = new URL(
    "file://" + path.join(__dirname, "./myapp/build/index.html")
  ).href;
  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
