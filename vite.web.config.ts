import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path, { resolve } from 'path'

export default defineConfig({
    root: './src/renderer',
    base: './',
    resolve: {
        alias: {
            '@renderer': resolve(__dirname, 'src/renderer/src'),
            '@': resolve(__dirname, 'src/renderer/src')
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        UnoCSS(),
        createSvgIconsPlugin({
            iconDirs: [resolve(__dirname, 'src/renderer/src/assets/svgs')],
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    build: {
        outDir: '../dist-web',
        emptyOutDir: true
    },
    server: {
        port: 3000,
        open: true,
        allowedHosts: ['2eve2r1e3j-3000.cnb.run']
    }
})
