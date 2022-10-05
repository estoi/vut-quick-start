import { UserConfig, ConfigEnv } from 'vite'
import { resolve } from 'path'
import { createVitePlugins } from '/@/utils/vite'
import proxy from '/@/utils/vite/proxy'
import { VITE_PORT, VITE_OPEN_PROXY } from '/@/config/constant'

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir)
}

export default ({ command }: ConfigEnv): UserConfig => {
    const isBuild = command === 'build'
    let base: string
    base = command === 'build' ? '/fast-vue/' : '/'

    return {
        base,
        resolve: {
            alias: [
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/'
                },
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/'
                }
            ]
        },
        plugins: createVitePlugins(isBuild),
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        clearScreen: false,
        server: {
            open: true,
            cors: true,
            port: VITE_PORT,
            strictPort: true,
            proxy: VITE_OPEN_PROXY && proxy
        },
        envPrefix: ['VITE_', 'TAURI_'],
        build: {
            target: ['es2021', 'chrome100', 'safari13'],
            minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
            sourcemap: !!process.env.TAURI_DEBUG
        }
    }
}
