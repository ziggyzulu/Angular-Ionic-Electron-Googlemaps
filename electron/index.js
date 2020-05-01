const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron');
const isDevMode = require('electron-is-dev');
const { CapacitorSplashScreen, configCapacitor } = require('@capacitor/electron');

const path = require('path');

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = true;

//Set a path to the icon file name depending on the platform. ICO for windows, or PNg for Mac
const iconPath = path.join(__dirname, 'images', process.platform === 'win32' ? 'icon.ico' : 'icon.png');

// Create simple menu for easy devtools access, and for demo
// const menuTemplateDev = [
//   {
//     label: 'Options',
//     submenu: [
//       {
//         label: 'Open Dev Tools',
//         click() {
//           mainWindow.openDevTools();
//         },
//       },
//     ],
//   },
// ];

const menuTemplate = [];

//Different defaukt menus for Mac, Windows and Linux

const appMenu = {role: 'appMenu'};
const fileMenu = {role: 'fileMenu'};
const editMenu = {role: 'editMenu'};
const windowMenu = {role: 'windowMenu'};

//Default role for the dev tools

const devMenu = {
  label: 'Options',
  submenu: [
    {role: 'toggleDevTools', label: 'Dev Tools', accelerator: 'F12'},
    {role: 'reload'},
    {role: 'forceReload'}
  ]
}

//Push either theapp or file menu depending on wether the app is running on a Mac
if(process.platform === 'darwin'){
  menuTemplate.push(appMenu);
} else {
  menuTemplate.push(fileMenu);
}

//Then push the edit and window menu
menuTemplate.push(editMenu, windowMenu);

//And if the Mac is running in Dev mode, also push the Dev menu in
if(isDevMode){

  menuTemplate.push(devMenu);

}

async function createWindow () {
  //Mac only
  if (app.dock){
    app.dock.setIcon(iconPath);
  }
  // Define our main window size
  mainWindow = new BrowserWindow({
    icon: iconPath,
    height: 920,
    width: 1600,
    show: false,
    //Options sent to the chromium browser inside the
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'node_modules', '@capacitor', 'electron', 'dist', 'electron-bridge.js')
    }
  });

  configCapacitor(mainWindow);

  if (isDevMode) {
    // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    // If we are developers we might as well open the devtools by default.
    mainWindow.webContents.openDevTools();
  }

  //If use splashscren is set to true
  if(useSplashScreen) {

    //You can customize the splash screen by passing an object into the SplashScreen constructor
    splashScreen = new CapacitorSplashScreen(mainWindow, {
      imageFileName: 'splash.png',
      windowHeight: 640,
      windowWidth: 640,
      loadingText: 'Starting Pinpoint',
      textColor: '#f0f0f0',
      textPercentageFromTop: 85
    });
    splashScreen.init();
    //Else just load the window without any splash screen
  } else {
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.webContents.on('dom-ready', () => {
      mainWindow.show();
    });
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on('ready', startup);

function startup(){

  createWindow();
  buildTray();

  //Subscribe to the addresses channel, which recives an event object and the paramater. Call the
  // setTrayMenu function in the callback, passing in the paramater.
  ipcMain.on('addresses', (evt, addresses) => setTrayMenu(addresses));

}

function buildTray(){

  

  //Select the icon depending on the OS
  const trayIcon = process.platform === 'win32' ? 'icon.ico' : 'tray-icon.png';
  //Pass the value to the tray constructer, which returns an instant of the tray object just created (import tray first)
  tray = new Tray(path.join(__dirname, 'images', trayIcon));
  
  tray.on('double-click', () => mainWindow.show());

  //Set the pressed image. This is Mac specific
  tray.setPressedImage(path.join(__dirname, 'images', 'tray-icon-pressed.png'));

  //A tool tip window will pop up when you hover the mouse over it. Set it to the value returned by
  // asking the app for it's name
  tray.setToolTip(app.getName());

  //Call setTrayMenu, passing in an empty address list.
  setTrayMenu([]);

};

function setTrayMenu(addresses){

  //Ceate a menu to show when the icon is clicked.
  tray.setContextMenu(Menu.buildFromTemplate([
    //{role: 'about'},
    //Build a template from the list of addresses provided. The template
    //will be returned from the buildAddress function 
    buildAddressMenu(addresses),
    {type: 'separator'}, {role:'quit'}
  ]));
}

//Build a menu template from the list of template proided
function buildAddressMenu(addressList){

  //If addresses is null or undefined, give it an empty array to work with
  const addresses = addressList || [];

  //Create new menu template
  const addressMenuTemplate = {

    label: 'Addresses',
    //If the array has no items, set it to disabled
    disabled: addresses.length,
    //Map the array passed in to a new array, creating menu items with a click function.
    submenu: addresses.map((addr, i) => {
      return {
        label : `${addr.addressLine1}, ${addr.city}, ${addr.state}`,
        click: () => setAddress(addr.addressId)
      }
    })

  };

  //Return the completed template to the caller
  return addressMenuTemplate;

}

function setAddress(addressId){

  //Send data to the ionic app using mainwindow.webcontents
  mainWindow.webContents.send('setAddress', addressId);

};

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Define any IPC or other custom functionality below here
