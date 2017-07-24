import {expect} from 'test-drive-react';
export default function hasState(elem: Element | null, styles: any, name: string): void | never {
    if (!elem) {
        throw new Error(`Element does not exists"`)
    }
    const map = styles.$stylesheet.cssStates({[name]: true});
    const stylableName = Object.keys(map)[0];
    expect(elem).to.have.attr(stylableName, 'true')
}

