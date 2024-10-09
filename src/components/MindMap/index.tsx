import './style.css';
import { useMindMapTheme } from './compose/useMindMapTheme';
import { MindMapSystem, useMindMap } from './compose/useMindMap';
import { MindMapCtx } from './ctx';
import { useSave } from './Storage/useSave';
import { Show } from 'solid-js';
import { watch } from 'solidjs-use';
import { FileListDialog } from './Dialog/FileListDialog';

export default () => {
    const container = NullAtom<HTMLDivElement>(null);
    const mindMapSystem = useMindMap(container);
    return (
        <MindMapCtx.Provider value={mindMapSystem}>
            <section class="h-screen w-screen relative mind-map-section overflow-hidden">
                <MindMapUI mindMapSystem={mindMapSystem}></MindMapUI>
                <div class="h-full w-full" ref={container}></div>
            </section>
        </MindMapCtx.Provider>
    );
};

/** UI 控件层，处理用户交互 */
export const MindMapUI = (props: { mindMapSystem: MindMapSystem }) => {
    const { mindMap, openingFile } = MindMapCtx.use();
    useMindMapTheme(props.mindMapSystem);

    const saveControl = useSave(openingFile);

    const initChart = () =>
        saveControl.load().catch((e) => {
            mindMap()!.setData({
                data: {
                    text: 'Root',
                },
                children: [],
            });
        });

    watch(openingFile, initChart);
    watch(mindMap, (value) => {
        if (value) {
            // 初始化图表
            initChart();
            mindMap()!.on(
                'data_change',
                debounce({ delay: 500 }, () => {
                    saveControl.save();
                })
            );
            stop();
        }
    });
    const FileListOpening = atom(false);
    return (
        <>
            <div class="control-box top-4 left-4">
                操作
                {openingFile()}
                <button onclick={() => FileListOpening(true)}>文件</button>
                <button onclick={() => saveControl.save()}>保存</button>
            </div>
            <Show when={FileListOpening() || !openingFile()}>
                <FileListDialog onclose={() => FileListOpening(false)}></FileListDialog>
            </Show>
        </>
    );
};
