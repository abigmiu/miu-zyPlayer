import { nextTick, onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import * as monaco from "monaco-editor";
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

// 额外的ts 类型
import testDts from '@renderer/types/template/test.d.ts?raw'

function injectDts(): void {
    const loadFiles = [
        { name: 'axios', path: '../../../../../node_modules/axios/index.d.ts' },
        { name: 'cheerio', path: '../../../../../node_modules/cheerio/dist/esm/cheerio.d.ts' },
        { name: 'crypto-js', path: '../../../../../node_modules/@types/crypto-js/index.d.ts' }
    ]

    const axiosImportMeta = import.meta.glob('../../../../../node_modules/axios/index.d.ts', {  query: '?raw'})
    axiosImportMeta['../../../../../node_modules/axios/index.d.ts']()
        .then((content: { default: string }) => {
            console.log('axiosImportMeta content', content);
            if (content.default) {
                monaco.languages.typescript.typescriptDefaults.addExtraLib(content.default, 'axios')
            }
        })
    const cheerioImportMeta = import.meta.glob('../../../../../node_modules/cheerio/dist/esm/cheerio.d.ts', {  query: '?raw'})
    cheerioImportMeta['../../../../../node_modules/cheerio/dist/esm/cheerio.d.ts']()
        .then((content: { default: string }) => {
            console.log('cheerioImportMeta content', content);
            if (content.default) {
                monaco.languages.typescript.typescriptDefaults.addExtraLib(content.default, 'cheerio')
            }
        })
    const cryptoJsImportMeta = import.meta.glob('../../../../../node_modules/@types/crypto-js/index.d.ts', {  query: '?raw'})
    cryptoJsImportMeta['../../../../../node_modules/@types/crypto-js/index.d.ts']()
        .then((content: { default: string }) => {
            console.log('cryptoJsImportMeta content', content);
            if (content.default) {
                monaco.languages.typescript.typescriptDefaults.addExtraLib(content.default, 'crypto-js')
            }
        })


    monaco.languages.typescript.typescriptDefaults.addExtraLib(testDts, 'file:///test.d.ts')
    console.log('dts 注册成功')
}


export function useEditor() {
    const playgroundRef = useTemplateRef<HTMLDivElement>('playgroundRef');
    let editor: monaco.editor.IStandaloneCodeEditor | null = null;

    onMounted(() => {
        initEditor();
    })
    onBeforeUnmount(() => {
        if (editor) {
            editor.dispose();
        }
    })

    async function initEditor(): void {
        if (!playgroundRef.value) {
            return;
        }

        await nextTick();

        self.MonacoEnvironment = {
            getWorker(workerId, label) {
                if (label === 'typescript' || label === 'javascript') {
                    return new tsWorker();
                }
                return new editorWorker();
            },
        }

        // Set compiler options
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            allowJs: true,
            allowNonTsExtensions: true,
            noEmit: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        });

        // Create the editor first
        editor = monaco.editor.create(playgroundRef.value, {
            language: 'typescript',
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 16,
        })

        // Now inject the d.ts files after the editor is created
        injectDts();


        // Refresh the model to recognize the new types
        const model = editor.getModel();
        if (model) {
            // Re-set the language to trigger type re-evaluation
            monaco.editor.setModelLanguage(model, 'typescript');
        }
    }


    return {
        playgroundRef,
    }
}
