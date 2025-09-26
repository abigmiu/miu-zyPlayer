import { platform } from '@electron-toolkit/utils'
import { app, Menu, MenuItem, MenuItemConstructorOptions } from 'electron'

export function createWindowMenu(): void {
    if (!platform.isMacOS) {
        Menu.setApplicationMenu(null)
        return
    }
    console.log('app.name', app.name)
    const appMenuOptions: MenuItemConstructorOptions = {
        label: app.getName(),
        submenu: [{ label: '关于', role: 'about' }]
    }
    const displayMenuOptions: MenuItemConstructorOptions = {
        label: '显示',
        submenu: [{ label: '切换开发者工具', role: 'toggleDevTools' }]
    }

    const menuBar: Array<MenuItemConstructorOptions | MenuItem> = [
        appMenuOptions,
        displayMenuOptions
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuBar))
}
