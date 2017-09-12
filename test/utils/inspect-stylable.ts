import {Stylesheet} from 'stylable';

export function elementHasStylableState(
    element: Element,
    stylesheet: {$stylesheet: Stylesheet},
    stateName: string
) {
    const stateMap = stylesheet.$stylesheet.cssStates({[stateName]: true});
    const attributeName = Object.keys(stateMap)[0];
    return element.hasAttribute(attributeName);
}

export function elementHasStylableClassName(
    element: Element,
    stylesheet: {$stylesheet: Stylesheet},
    className: string
) {
    const mangledClassName = stylesheet.$stylesheet.get(className);
    return element.classList.contains(mangledClassName);
}
