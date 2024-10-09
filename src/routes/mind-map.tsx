import { clientOnly } from '@solidjs/start';
const MindMapClient = clientOnly(() => import('~/components/MindMap'));
export default () => <MindMapClient></MindMapClient>;
