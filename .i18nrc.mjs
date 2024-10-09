import { defineConfig } from 'i18nation'
export default {
    "entry": "./src/i18n/zh-cn.json",
    "entryLocale": "zh",
    "output": "src/i18n",
    "outputLocales": ["en"],
    jsonMode: true,
    translateMap: {
        en: {
            "江夏尧": "KonghaYao",
            "中文网字计划": "中文网字计划",
            "使用教程": "How to Use",
            "技术内幕": "Technical Insights",
            "维护日志": "Maintenance Log",
            "性能优化": "Performance Optimization",
            "分包": "Subset"
        }
    },
    markdown: {
        entry: ['./src/content/post/zh-cn/*.md'],
        entryLocale: 'zh-CN',
        entryExtension: '.md',
        outputLocales: ['en'],
        includeMatter: true,
        outputExtensions: (locale, { getDefaultExtension }) => {
            return '.md';
        },
        outputFileName(locale, path) {
            return path.replace('/zh-cn/', '/' + locale + '/')
        }
    },
    i18nation: defineConfig({
        src: 'src/**/*.{jsx,tsx,ts,astro}',
        exclude: ['**/utils/**/*', '**/*.d.ts', "**/heti.astro"],
        createTranslateCode(hash, params) {
            return `$t("${hash}"${params ? `, ${params}` : ''})`
        },
        createStringSlot(key) {
            return `{{${key}}}`
        },

        outputJSON: 'src/i18n/zh-cn.json',
        jsonConfig: {
            mode: "flat",
            indent: 4,
        },
        prune: {
            json: "./src/i18n/*.json"
        }
    })
};
