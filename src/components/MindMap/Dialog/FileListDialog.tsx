import { Flex, Select, IconButton, Pagination } from '@cn-ui/core';
import { MindMapCtx } from '../ctx';

export const FileListDialog = (props: { onclose: () => void }) => {
    const { store, getRegisteredStorage, openingFile } = MindMapCtx.use();
    const currentStorage = atom(['local:']);
    const pagination = usePagination(
        (pageIndex, maxPage, count) => {
            if (!currentStorage().length) throw new Error('currentStorage is not ready');
            return store.storageMapper
                .get(currentStorage()[0])!
                .listData({
                    baseUri: currentStorage() + '//',
                    limit: 10,
                    page: pageIndex,
                })
                .then((res) => {
                    count(res.count);
                    return res.list;
                });
        },
        { deps: [currentStorage] }
    );
    return (
        <div class="absolute shadow-2xl absolute-center z-100  bg-white rounded-lg p-4 min-w-96">
            <Flex class="mb-4" justify="start">
                <Select
                    v-model={currentStorage}
                    options={getRegisteredStorage().map((i) => {
                        return {
                            label: i,
                            value: i,
                        };
                    })}
                ></Select>
                <div class="flex-1 flex justify-end">
                    <IconButton onclick={() => pagination.refetch()}>搜</IconButton>
                    <IconButton
                        onclick={() => {
                            const name = prompt();
                            openingFile(currentStorage() + '//' + name);
                            props.onclose?.();
                        }}
                    >
                        加
                    </IconButton>
                </div>
            </Flex>
            <ul class=" min-h-48">
                {pagination.currentData()?.map((i) => {
                    return (
                        <li
                            class="cursor-pointer px-2"
                            onclick={() => {
                                openingFile(i.uri);
                                props.onclose?.();
                            }}
                            classList={{
                                'bg-red-100': openingFile() === i.uri,
                            }}
                        >
                            {i.uri}
                        </li>
                    );
                })}
            </ul>

            <Pagination class="border-t border-gray-300 pt-4" {...pagination}></Pagination>
        </div>
    );
};
