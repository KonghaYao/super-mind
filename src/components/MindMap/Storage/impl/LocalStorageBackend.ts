import { StorageBackend, decodeStorageKey } from '../StorageBackend';

export class LocalStorageBackend implements StorageBackend {
    async setData(uri: string, data: any): Promise<boolean> {
        localStorage.setItem(uri, JSON.stringify(data));
        return true;
    }
    async getData(uri: string): Promise<any> {
        const data = localStorage.getItem(uri);
        if (!data) throw new Error('data not found ' + uri);
        return JSON.parse(data);
    }
    async listData(params: { baseUri: string; limit: number; page: number }) {
        const Uri = decodeStorageKey(params.baseUri);
        const keys = Object.keys(localStorage).filter((key) => key.startsWith(Uri.protocol));
        const data = keys.map((key) => {
            return {
                uri: key,
            };
        });
        return { list: data, count: data.length, page: 1 };
    }
}
