import { defineConfig } from '@solidjs/start/config';
/* @ts-ignore */
import pkg from '@vinxi/plugin-mdx';
import font from 'vite-plugin-font';
import AutoImport from 'unplugin-auto-import/vite';
import { remarkMdxToc } from 'remark-mdx-toc';
import solid from 'vite-plugin-solid';
const { default: mdx } = pkg;
/* @ts-ignore */
import Reactive from '@cn-ui/reactive//dist/unimport-entry.mjs';
export default defineConfig({
    extensions: ['mdx', 'md', 'tsx', 'ts'],
    server: {
        plugins: [],
    },
    vite: {
        plugins: [
            AutoImport({
                include: [/\.[tj]sx?/],
                imports: [
                    {
                        '~/i18n': ['$t'],
                        '@solidjs/router': ['A', 'useParams', 'cache'],
                    },
                    Reactive,
                    {
                        '@cn-ui/reactive': ['Atom'],
                    },
                ],
                dts: './auto-imports.d.ts',
                viteOptimizeDeps: false,
            }),
            mdx.withImports({})({
                jsx: true,
                jsxImportSource: 'solid-js',
                providerImportSource: 'solid-mdx',
                remarkPlugins: [remarkMdxToc],
            }),
            font.vite({}),
        ],
    },
});
