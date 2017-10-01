import { Stylesheet } from 'stylable';
export declare function hasCssState(elem: Element | null, stylesheet: {
    $stylesheet: Stylesheet;
}, stateMap: {
    [key: string]: boolean;
}): void | never;
