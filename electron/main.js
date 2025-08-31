const {app, BrowserWindow, Menu, globalShortcut} = require('electron');
const path = require('path');

function createWindow(){
  const win = new BrowserWindow({
    width: 1100, height: 700,
    webPreferences: {},
    alwaysOnTop: true
  });
  win.loadFile(path.join(__dirname, '..', 'index.html'));

  const template = [{
    label: 'View', submenu: [
      { label: 'Always On Top', type: 'checkbox', checked: true, click: (item)=> win.setAlwaysOnTop(item.checked) },
      { label: 'Fullscreen', accelerator: 'Alt+Enter', click: ()=> win.setFullScreen(!win.isFullScreen()) },
      { type: 'separator' },
      { role: 'reload' },
      { role: 'toggleDevTools' }
    ]
  }];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  globalShortcut.register('Alt+Enter', ()=> win.setFullScreen(!win.isFullScreen()));
}

app.whenReady().then(()=>{
  createWindow();
  app.on('activate', ()=>{ if(BrowserWindow.getAllWindows().length===0) createWindow(); });
});
app.on('will-quit', ()=>{ globalShortcut.unregisterAll(); });
app.on('window-all-closed', ()=>{ if(process.platform!=='darwin') app.quit(); });
