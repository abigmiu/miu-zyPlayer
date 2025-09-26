import { nextTick, onBeforeUnmount, onMounted, ShallowRef, useTemplateRef } from 'vue'
import * as monaco from 'monaco-editor'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { MonacoEnvironment } from 'monaco-editor/esm/vs/editor/editor.api'

// 额外的ts 类型
import testDts from '@renderer/types/template/test.d.ts?raw'
import injectUtilDts from '@renderer/types/template/util.d.ts?raw'

function injectAxiosDts(): void {
    const importMeta: Record<string, string> = import.meta.glob(
        '../../../../../node_modules/axios/index.d.ts',
        { query: '?raw', import: 'default', eager: true }
    )
    const dts = importMeta['../../../../../node_modules/axios/index.d.ts']
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
        dts,
        'file:///node_modules/axios/index.d.ts'
    )
}

function injectCryptoDts(): void {
    const importMeta: Record<string, string> = import.meta.glob(
        '../../../../../node_modules/@types/crypto-js/index.d.ts',
        { query: '?raw', import: 'default', eager: true }
    )
    const dts = importMeta['../../../../../node_modules/@types/crypto-js/index.d.ts']
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
        dts,
        'file:///node_modules/crypto-js/index.d.ts'
    )
}

function injectCheerioDts(): void {
    const importMeta: Record<string, string> = import.meta.glob(
        '../../../../../node_modules/cheerio/dist/esm/**/*.d.ts',
        { query: '?raw', import: 'default', eager: true }
    )
    Object.keys(importMeta).forEach((path) => {
        const dts = importMeta[path]
        const virtualPath = path.slice(14).replace('/dist/esm/', '/')
        monaco.languages.typescript.typescriptDefaults.addExtraLib(dts, `file://${virtualPath}`)
    })
}

async function injectDts(): Promise<void> {
    injectAxiosDts()
    injectCryptoDts()
    injectCheerioDts()

    console.log(monaco.languages.typescript.typescriptDefaults.getExtraLibs())

    monaco.languages.typescript.typescriptDefaults.addExtraLib(injectUtilDts, 'file:///util.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(testDts, 'file:///test.d.ts')
    console.log('dts 注册成功')
}

export async function useEditor(): Promise<{
    playgroundRef: Readonly<ShallowRef<HTMLDivElement | null>>
}> {
    const playgroundRef = useTemplateRef<HTMLDivElement>('playgroundRef')
    let editor: monaco.editor.IStandaloneCodeEditor | null = null

    onMounted(() => {
        initEditor()
    })
    onBeforeUnmount(() => {
        if (editor) {
            editor.dispose()
        }
    })

    async function initEditor(): Promise<void> {
        if (!playgroundRef.value) {
            return
        }

        await nextTick()

        MonacoEnvironment.getWorker = (workerId, label) => {
            if (label === 'typescript' || label === 'javascript') {
                return new tsWorker()
            }
            return new editorWorker()
        }
    }

    // Set compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowJs: true,
        allowNonTsExtensions: true,
        noEmit: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs
    })

    await injectDts()

    const model = monaco.editor.createModel('', 'typescript')

    editor = monaco.editor.create(playgroundRef.value!, {
        model,
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 16
    })
    return {
        playgroundRef
    }
}
