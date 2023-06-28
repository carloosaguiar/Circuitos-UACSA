const {
    app,
    BrowserWindow
} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            //preload: path.join(__dirname, 'preload.js')
        }
    })
    if (isDev) {
        console.log('Running in development');
    } else {
        console.log('Running in production');
    }

    win.loadURL(isDev ?
        "http://localhost:3000" :
        `file://${path.join(__dirname, "../public/index.jsx")}`)

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})