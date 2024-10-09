import { Popover } from '@cn-ui/core';
import { onMount } from 'solid-js';
export default () => {
    const count = atom(1000);
    const open = atom(true);
    return (
        <>
            <Popover
                v-model={open}
                content={() => <div>内容</div>}
                placement="bottom"
                trigger="hover"
            >
                <button
                    id="button"
                    onclick={() => {
                        count((i) => i + 1);
                    }}
                >
                    {count()}
                </button>
            </Popover>
        </>
    );
};
