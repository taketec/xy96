const { shell,app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');

app.setAsDefaultProtocolClient('xy96') 

let win

function createWindow() {    
 
    const startUrl = __dirname + '/index.html'
        win = new BrowserWindow({        
            width: 800,        
            height: 800,        
            webPreferences: {            
                nodeIntegration: true        
            }    });    
            win.loadFile(startUrl);    
            app.on('window-all-closed', () => {
                        if (process.platform !== 'darwin') {            
                            app.quit()        
                        }    });
                    }

app.whenReady().then(createWindow);app.on('window-all-closed', () => {    
    if (process.platform !== 'darwin') {        
        app.quit()    
    }});

const gotTheLock = app.requestSingleInstanceLock()
    
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
        win.focus()
    }
  })
}

app.on('open-url',(event,url)=>{
    dialog.showErrorBox('yo',`youve come from ${url}`)
}
)

app.on('activate', () => {    
    if (BrowserWindow.getAllWindows().length === 0) {        
        createWindow()    
    }});