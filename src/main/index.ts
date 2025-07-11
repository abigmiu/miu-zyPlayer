import { app, shell, BrowserWindow, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createWindowMenu } from './core/menu';
// import * as fixPath from 'fix-path';

/** 浏览器默认设置 */
function setBrowserDefaultConfig() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // 忽略 TLS 证书错误
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'; // 关闭安全警告
    app.commandLine.appendSwitch(
        'disable-features',
        'OutOfBlinkCors, SameSiteByDefaultCookies, CookiesWithoutSameSiteMustBeSecure, BlockInsecurePrivateNetworkRequests, OutOfProcessPdf, IsolateOrigins, site-per-process, StandardCompliantNonSpecialSchemeURLParsing',
    ); // 禁用
    app.commandLine.appendSwitch('enable-features', 'PlatformHEVCDecoderSupport, HardwareAccelerationModeDefault'); // 启用
    app.commandLine.appendSwitch('ignore-certificate-errors'); // 忽略证书错误
    app.commandLine.appendSwitch('disable-web-security'); // 禁用安全
    app.commandLine.appendSwitch('disable-renderer-backgrounding'); // 禁用渲染器后台化
    app.commandLine.appendSwitch('disable-site-isolation-trials'); // 禁用站点隔离试验
    app.commandLine.appendSwitch('gpu-memory-buffer-compositor-resources'); // GPU内存缓冲
    app.commandLine.appendSwitch("ignore-gpu-blacklist"); // 忽略GPU黑名单
    app.commandLine.appendSwitch("no-sandbox"); // 禁用沙盒
    app.commandLine.appendSwitch('proxy-bypass-list', '<local>'); // 代理白名单
    app.commandLine.appendSwitch('wm-window-animations-disabled'); // 禁用窗口动画
}

function createWindow(): void {
    // Create the browser window.

    const primaryDisplay = screen.getPrimaryDisplay();
    const { x, y, width, height } = primaryDisplay.workArea;
    console.log('app.name', app.name)
    const mainWindow = new BrowserWindow({
        x,
        y,
        width,
        height,
        frame: false,
        titleBarStyle: 'hidden',
        show: false,
        autoHideMenuBar: true,
        trafficLightPosition: { x: 12, y: 20 },
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        },
        title: app.name,
    })
    mainWindow.webContents.openDevTools();

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

function bootstrap() {
    // fixPath();
    app.setName('视界');
    setBrowserDefaultConfig();
}

bootstrap();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('abigmiu.zyplayer')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })
    createWindow();

    createWindowMenu();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
