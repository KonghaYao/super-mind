import { StorageBackend, decodeStorageKey } from '../StorageBackend';
import LF from 'localforage';
const localforage = LF.createInstance({
    driver: LF.INDEXEDDB,
    name: 'super-mind-db',
    version: 1.0,
    storeName: 'super-mind-db',
    description: 'super-mind-db'
})

export class LocalBackend implements StorageBackend {
    async setData(uri: string, data: any): Promise<boolean> {
        await localforage.setItem(uri, data);
        return true;
    }
    async getData(uri: string): Promise<any> {
        const data = await localforage.getItem<any>(uri);
        if (!data) throw new Error('data not found ' + uri);
        return data;
    }
    async listData(params: { baseUri: string; limit: number; page: number }) {
        const Uri = decodeStorageKey(params.baseUri);
        const keys = (await localforage.keys()).filter((key) => key.startsWith(Uri.protocol));
        const data = keys.map((key) => {
            return {
                uri: key,
            };
        });
        return { list: data, count: data.length, page: 1 };
    }
}
