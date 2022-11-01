/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const {app, BrowserWindow, Tray} = require('electron');
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
const test = 'test'
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680
  });
  const usePath = isDev ? 'http://localhost:3000/rexregina' : 'https://rexreginaschools.com/rexregina'
  // const usePath = isDev ? 'http://localhost:3000/rexregina' : 'https://easysch.com/rexregina'
  // const startUrl = url.format({
  //   pathname: usePath,

  // })
  mainWindow.loadURL(usePath);
  mainWindow.on('closed', () => mainWindow = null);
  const icon = isDev ? path.join(__dirname,'./icons/icon.png') : path.join(__dirname,'../build/icons/icon.png')
  new Tray(icon)
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
