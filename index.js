const { app, BrowserWindow } = require('electron')
function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({fullscreen : true})
  // and load the index.html of the app.
  win.loadFile('public/site/home.html')
}
app.on('ready', createWindow)