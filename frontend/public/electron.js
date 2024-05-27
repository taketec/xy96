const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');

app.setAsDefaultProtocolClient('xy96') 


function createWindow() {    
 
    const startUrl = __dirname + '/index.html'
        const win = new BrowserWindow({        
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

app.on('open-url',(event,url)=>{
    dialog.showErrorBox('yo',`youve come from ${url}`)
}
)

app.on('activate', () => {    
    if (BrowserWindow.getAllWindows().length === 0) {        
        createWindow()    
    }});