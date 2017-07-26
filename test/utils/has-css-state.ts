import {expect} from 'test-drive-react';
export default function hasCssState(elem: Element | null, styles: any, name: string): void | never {
    if (!elem) {
        throw new Error(`Element does not exists"`);
    }
    const attrName = 'data-' + styles.$stylesheet.namespace + '-' + name;
    expect(elem).to.have.attr(attrName, 'true');
}

