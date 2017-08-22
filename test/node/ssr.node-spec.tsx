import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {expect} from 'test-drive-react';
import * as WixReactComponents from '../../src';

const isReactComponent = (value: any) => value && value.prototype && value.prototype instanceof React.Component;

describe('SSR compatibility', function() {
    const libExportNames = Object.keys(WixReactComponents);

    libExportNames.forEach(exportName => {
        const ExportValue = (WixReactComponents as any)[exportName];

        if (isReactComponent(ExportValue)) {

            it(`<${exportName} /> renders on Node.js using React's server side rendering`, () => {
                expect(() => renderToString(<ExportValue />)).to.not.throw();
            });
        }
    });
});
