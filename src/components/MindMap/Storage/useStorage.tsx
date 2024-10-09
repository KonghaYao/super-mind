import { LocalStorageBackend } from './impl/LocalStorageBackend';
import { StorageLayer } from './StorageBackend';

export const useStorage = () => {
    // 存储层
    const store = new StorageLayer();
    store.registerStorage('local:', new LocalStorageBackend());

    return {
        store,
        getRegisteredStorage() {
            return [...store.storageMapper.keys()];
        },
    };
};
