const { contextBridge } = require("electron");
//preload.js
const os = require("os");

contextBridge.exposeInMainWorld("electron", {
  homeDir: () => os.homedir(),
  closeApp: () => ipcRenderer.send("close-app"),
});
