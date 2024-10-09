import { Accessor, onCleanup, onMount } from 'solid-js';
import type { default as SimpleMindMap } from 'simple-mind-map';
import { isServer } from 'solid-js/web';
import { Atom } from '@cn-ui/reactive';
import { useStorage } from '../Storage/useStorage';
import { useStorage as useStorageAsync } from 'solidjs-use';
export type MindMapSystem = ReturnType<typeof useMindMap>;
export function useMindMap(container: Atom<HTMLDivElement | null>) {
    const mindMap = NullAtom<SimpleMindMap>(null);
    onMount(async () => {
        if (!isServer) {
            const { default: MindMap } = await import('simple-mind-map/dist/simpleMindMap.umd.min');
            // @ts-ignore
            const instance = new MindMap({
                el: container(),
                data: {},
            });
            mindMap(instance);
        }
    });
    onCleanup(() => {
        mindMap()?.destroy();
    });
    return {
        ...useStorage(),
        ...useUser(),
        mindMap,
        importJSON(json: any) {
            const data = json;
            // 如果数据中存在root属性，那么代表是包含配置的完整数据，则使用setFullData方法导入数据
            if (data.root) {
                mindMap()!.setFullData(data);
            } else {
                // 否则使用setData方法导入
                mindMap()!.setData(data);
            }
            // 导入数据后有可能新数据渲染在可视区域外了，所以为了更好的体验，可以复位一下视图的变换
            mindMap()!.view.reset();
        },
    };
}
export const useUser = () => {
    const signal = useStorageAsync<string>('mind-map-opening-file', null);
    const openingFile = SignalToAtom(signal);
    return {
        openingFile,
    };
};
