import { expect } from 'test-drive-react';

import { Stylesheet } from 'stylable';

export default function hasCssState(elem: Element | null, stylesheet: { $stylesheet: Stylesheet }, stateMap: { [key: string]: boolean }): void | never {
    
    if (!elem) {
        throw new Error(`hasCssState: Element does not exists"`);
    }

    var errors = [];
    for (let k in stateMap) {

        var mapping = stylesheet.$stylesheet.cssStates({ [k]: true });
        if (stateMap[k]) {
            for (let m in mapping) {
                if (!elem.hasAttribute(m)) {
                    errors.push(`expected element to have state ":${k}" with mapping to "${m}" but got nothing.`);
                }
            }
        } else {
            for (let m in mapping) {
                if (elem.hasAttribute(m)) {
                    errors.push(`expected element to not have state ":${k}" but found with mapping "${m}".`);
                }
            }
        }
    }

    if (errors.length) {
        throw new Error('hasCssState:\n' + errors.join('\n'));
    }

}

