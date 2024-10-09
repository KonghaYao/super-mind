import { Accessor } from 'solid-js';
import { MindMapCtx } from '../ctx';

/** 提供锁相关的功能 */
export const useLock = () => {
    const isLocked = atom(false);
    return {
        isLocked,
        autoRecoverAfter(ms: number) {
            isLocked(true);
            const timer = setTimeout(() => {
                isLocked(false);
            }, ms);
            return () => clearTimeout(timer);
        },
    };
};

/**
 * 保存服务，只需要链接对应的 URI，就可以无视平台读写数据
 */
export const useSave = (key: Accessor<string>) => {
    const { mindMap, store } = MindMapCtx.use()!;
    const saveLock = useLock();
    const saveAction = resource(async () => {
        if (saveLock.isLocked()) return false;
        const data = mindMap()!.getData(false);
        await store.setData(key(), data);
        console.log('保存成功');
    });

    const save = async () => {
        await saveAction.refetch();
    };
    const openAutoSave = () => mindMap()!.on('data_change', save);
    const closeAutoSave = () => mindMap()!.off('data_change', save);

    return {
        save,
        isSaving: saveAction,
        async load() {
            const data = await store.getData(key());
            mindMap()?.setData(data);
            saveLock.autoRecoverAfter(1000);
        },
        openAutoSave,
        closeAutoSave,
    };
};
