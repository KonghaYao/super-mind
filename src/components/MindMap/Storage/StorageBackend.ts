/** 所有的资源统一使用资源定位符来获取 */
export const decodeStorageKey = (str: string) => {
    return new URL(str);
};
export interface StorageBackend {
    setData(uri: string, data: any): Promise<boolean>;
    getData(uri: string): Promise<any>;
    listData(params: { baseUri: string; limit: number; page: number }): Promise<{
        list: {
            uri: string;
            thumb?: string;
        }[];
        page: number;
        count: number;
    }>;
}

export class StorageLayer implements StorageBackend {
    constructor() {}
    storageMapper = new Map<string, StorageBackend>();
    registerStorage(protocol: string, storage: StorageBackend) {
        this.storageMapper.set(protocol, storage);
    }
    setData(uri: string, data: any): Promise<boolean> {
        const Uri = decodeStorageKey(uri);
        const storage = this.storageMapper.get(Uri.protocol);
        if (!storage) throw new Error('storage not found ' + Uri.protocol);
        return storage.setData(uri, data);
    }
    getData(uri: string): Promise<any> {
        const Uri = decodeStorageKey(uri);
        const storage = this.storageMapper.get(Uri.protocol);
        if (!storage) throw new Error('storage not found ' + Uri.protocol);
        return storage.getData(uri);
    }
    listData(params: { baseUri: string; limit: number; page: number }) {
        const Uri = decodeStorageKey(params.baseUri);
        const storage = this.storageMapper.get(Uri.protocol);
        if (!storage) throw new Error('storage not found ' + Uri.protocol);
        return storage.listData(params);
    }
}
