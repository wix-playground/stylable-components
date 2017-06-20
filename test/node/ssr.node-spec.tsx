import * as React from 'react';
import { expect } from 'test-drive-react';
import { renderToString } from 'react-dom/server';
import * as WixReactComponents from '../../src';

describe('SSR compatibility', () => {
    const libExportNames = Object.keys(WixReactComponents);

    libExportNames.forEach(exportName => {
        const ExportValue = (WixReactComponents as any)[exportName];

        if (isExtendingReactComponent(ExportValue)) {
            it(`<${exportName} /> renders on Node.js using React's server side rendering`, () => {
                expect(() => renderToString(<ExportValue />)).to.not.throw();
            });
        };
    });
});

function isExtendingReactComponent(value: any): value is React.ComponentClass<any> {
    if (!value || value === Object.prototype) {
        return false;
    } else {
        return value instanceof React.Component || isExtendingReactComponent(value.prototype);
    }
}
