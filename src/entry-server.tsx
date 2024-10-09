// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';
import { useContext } from 'solid-js';
import { i18nContext } from './i18n';

export default createHandler(() => (
    <StartServer
        document={({ assets, children, scripts }) => {
            const ctx = useContext(i18nContext);
            return (
                <html lang={ctx.lang}>
                    <head>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" href="/favicon.ico" />
                        {assets}
                    </head>
                    <body>
                        <div id="app">{children}</div>
                        {scripts}
                    </body>
                </html>
            );
        }}
    />
));
