import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate } from 'test-drive-react';
import { Slider } from '../../src/components/slider';

describe('<Slider />', () => {
  const clientRenderer = new ClientRenderer();

  afterEach(() => clientRenderer.cleanup())

  it('outputs an HTML element', async () => {
    const { select, waitForDom } = clientRenderer.render(<Slider />);

    await waitForDom(() => {
      const element = select('SLIDER') as HTMLInputElement;

      expect(element).to.be.present();
    });
  });

  // Here probably nothing to test as it's just stylable wrapper over native <input type="range"> for now.
});
