import { MindMapCtx } from '../ctx';
import { MindMapSystem } from './useMindMap';

export interface MindMapTheme {
    name: string;
    backgroundImage?: string;
    backgroundRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
    backgroundPosition?:
        | '0% 0%'
        | 'left top'
        | 'left center'
        | 'left bottom'
        | 'right top'
        | 'right center'
        | 'right bottom'
        | 'center top'
        | 'center center'
        | 'center bottom'
        | string;
    backgroundSize?: 'auto' | 'cover' | 'contain';
    lineColor?: string;
    lineWidth?: number;
    lineDasharray?: string;
    lineStyle?: string;
    generalizationLineColor?: string;
    generalizationLineWidth?: number;
    associativeLineColor?: string;
    associativeLineWidth?: number;
    associativeLineActiveColor?: string;
    associativeLineActiveWidth?: number;
    nodeUseLineStyle?: boolean;
    paddingX?: number;
    paddingY?: number;
    imgMaxWidth?: number;
    imgMaxHeight?: number;
    iconSize?: number;
    second?: MindMapTheme;
    node?: MindMapTheme;
}
const Themes: MindMapTheme[] = [
    {
        name: 'default',
    },
];
export function useMindMapTheme(system: MindMapSystem) {
    const { mindMap } = MindMapCtx.use();
    const theme = atom('default');
    useEffectWithoutFirst(() => {
        const target = Themes.find((t) => t.name === theme());
        if (!target) {
            console.warn('没有找到主题', theme());
        }
        mindMap()!.setTheme(target);
    }, [theme]);
    return {
        theme,
    };
}
