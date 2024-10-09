// @i18n-disable
import i18n from 'i18next';
import { createContext, useContext } from 'solid-js';
import resourcesToBackend from 'i18next-resources-to-backend';
import { isServer } from 'solid-js/web';
const createI18n = async (key: string, packages: () => any) => {
    const i = i18n.createInstance().use(resourcesToBackend(packages));
    await i.init(
        {
            // 设置默认语言
            lng: key,
            fallbackLng: key,
            // 是否启用调试模式
            debug: false,
        },
        function (err, t) {
            if (err) throw err;
            // i18n插件初始化完成或异常时的回调函数
            console.info(key, '初始化完成');
        }
    );
    return i;
};
export * from 'i18next';

export const languageConfig = {
    init(lang?: string) {
        return Promise.all(
            this.languages.map(async (i) => {
                if (lang && i.lang !== lang) return;
                this.store.set(i.lang, await createI18n(i.lang, i.json));
            })
        );
    },
    store: new Map<string, typeof i18n>(),
    languages: [
        {
            lang: 'zh-cn',
            name: '简体中文',
            json: () => import('./i18n/zh-cn.json'),
        },
        {
            lang: 'en',
            name: 'English',
            json: () => import('./i18n/en.json'),
        },
    ] as const,
    isAllowLanguage(lang: string) {
        return this.languages.some((i) => i.lang === lang);
    },
};
if (isServer) {
    await languageConfig.init();
} else {
    const lang = window.location.pathname.split('/')[1];
    await languageConfig.init(languageConfig.isAllowLanguage(lang) ? lang : 'zh-cn');
}

export const $t = (str: string, ...args: any) => {
    let lang = useContext(i18nContext)?.lang ?? 'zh-cn';
    if (!languageConfig.store.has(lang)) {
        lang = 'zh-cn';
    }
    let instance = languageConfig.store.get(lang)!;
    /** @ts-ignore */
    return instance.t(str, ...args);
};

export const i18nContext = createContext({
    lang: 'zh-cn',
});
