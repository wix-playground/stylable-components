import * as React from 'react';
import {ClientRenderer, expect} from 'test-drive-react';
import {ScreenReaderNotification} from '../../src';

xdescribe('<ScreenReaderNotification/>', () => {
    const clientRenderer = new ClientRenderer();
    afterEach(() => clientRenderer.cleanup());
    describe('render component', () => {
        let root: any;
        beforeEach(() => {
            const renderer = clientRenderer.render(<ScreenReaderNotification>Alert text</ScreenReaderNotification>);
            root = renderer.select('SCREEN_READER_NOTIFICATION');
        });
        it('should have "alert" role', () => {
            expect(root).attr('role', 'alert');
        });
        it('should have text content', () => {
            expect(root).text('Alert text');
        });
    });
});
