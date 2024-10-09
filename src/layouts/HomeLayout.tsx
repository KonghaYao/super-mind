import { JSXElement, useContext } from 'solid-js';
import { Meta, Link, MetaProvider, Base } from '@solidjs/meta';
import { i18nContext } from '~/i18n';
export default (props: { children: JSXElement; keywords?: string; title?: string }) => {
    return (
        <MetaProvider>
            <Meta
                name="keywords"
                content={props.keywords ?? $t('d43b734625429e539fb49080b13065d6')}
            ></Meta>
            <Link
                rel="preconnect"
                href="https://chinese-fonts-cdn.netlify.app"
                crossOrigin="anonymous"
            />
            <Link rel="preconnect" href="https://jsdelivr.deno.dev/" crossOrigin="anonymous" />
            <Base href={'/' + useContext(i18nContext).lang + '/'}></Base>
            <section>{props.children}</section>
        </MetaProvider>
    );
};
