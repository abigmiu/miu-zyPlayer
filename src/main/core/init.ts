import { app } from 'electron'
import path from 'path'
import fs from 'fs-extra'
import log from 'electron-log/main'

/** 初始化用户文件 */
export function initUserData(): void {
    const userDataPath = app.getPath('userData')

    const imgFolderPath = path.join(userDataPath, 'imgs')
    const videoFolderPath = path.join(userDataPath, 'video')

    fs.ensureDirSync(imgFolderPath)
    fs.ensureDirSync(videoFolderPath)
}

/** 初始化 日志 */
export function initLog(): void {
    log.initialize()
}
