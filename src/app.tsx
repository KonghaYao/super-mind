import { Router, useParams } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import './app.css';
import { i18nContext } from './i18n';
import '@cn-ui/core/dist/style.css';
import '@cn-ui/core/dist/cn-uno.css';
export default function App() {
    return (
        <Router
            root={(props) => {
                return (
                    <i18nContext.Provider value={useParams()}>
                        <Suspense>{props.children}</Suspense>
                    </i18nContext.Provider>
                );
            }}
        >
            <FileRoutes />
        </Router>
    );
}
