import { LocalBackend } from './impl/LocalBackend';
import { StorageLayer } from './StorageBackend';

export const useStorage = () => {
    // 存储层
    const store = new StorageLayer();
    store.registerStorage('local:', new LocalBackend());

    return {
        store,
        getRegisteredStorage() {
            return [...store.storageMapper.keys()];
        },
    };
};
