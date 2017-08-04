import * as React from 'react';
import { expect, ClientRenderer, sinon, simulate, waitFor } from 'test-drive-react';
import { Slider } from '../../src/components/slider';

describe.only('<Slider />', () => {
  const clientRenderer = new ClientRenderer();

  afterEach(() => clientRenderer.cleanup())

  describe('without any arguments', () => {
    let select: (automationId: string) => HTMLElement | null;
    let waitForDom: (expectation: Function) => Promise<void>;

    beforeEach(() => {
      const rendered = clientRenderer.render(<Slider />);
      select = rendered.select;
      waitForDom = rendered.waitForDom;
    });

    it('renders ok', async () => {
      await waitForDom(() => {
        const element = select('SLIDER');

        expect(element).to.be.present();        
      });
    });

    it('renders default value on the middle of the track', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-HANDLE');

        expect(element!.style.left).to.equal('50%');
      });
    });

    it('renders progress bar', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-PROGRESS');

        expect(element).to.be.present();        
        expect(element!.style.width).to.equal('50%');
      });
    });

    it('renders invisible native input with default value', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-NATIVE-INPUT');

        expect(element).to.be.present();
        expect(element).to.has.value('50');
      });
    });
  });

  describe('with value, min and max', () => {
    const value = 5;
    const min = -10;
    const max = 10;

    let select: (automationId: string) => HTMLElement | null;
    let waitForDom: (expectation: Function) => Promise<void>;

    beforeEach(() => {
      const rendered = clientRenderer.render(
        <Slider
          value={value}
          min={min}
          max={max}
        />
      );
      select = rendered.select;
      waitForDom = rendered.waitForDom;
    });

    it('renders ok', async () => {
      await waitForDom(() => {
        const element = select('SLIDER');

        expect(element).to.be.present();        
      });
    });

    it('renders handle on the right place', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-HANDLE');

        expect(element!.style.left).to.equal('75%');
      });
    });

    it('renders progress bar with the right width', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-PROGRESS');

        expect(element).to.be.present();        
        expect(element!.style.width).to.equal('75%');
      });
    });

    it('renders invisible native input with right value', async () => {
      await waitForDom(() => {
        const element = select('SLIDER-NATIVE-INPUT');

        expect(element).to.be.present();
        expect(element).to.has.value(String(value));
      });
    });
  });

  describe('when drag things around', () => {
    const value = 5;
    const min = 1;
    const max = 10;

    let onChange: (value: number) => void;
    let select: (automationId: string) => HTMLElement | null;
    let waitForDom: (expectation: Function) => Promise<void>;

    beforeEach(() => {
      onChange = sinon.spy();
      const rendered = clientRenderer.render(
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={onChange}
        />
      );
      select = rendered.select;
      waitForDom = rendered.waitForDom;
    });

    it('should change value', async () => {
      await waitFor(() => {
        const element = select('SLIDER');
        const handle = select('SLIDER-HANDLE');
        const progress = select('SLIDER-PROGRESS');
        const bounds = element!.getBoundingClientRect();

        simulate.mouseDown(element, {
          currentTarget: element!,
          clientY: bounds.top + bounds.height / 3,
          clientX: Math.round(bounds.left + bounds.width * 0.7)
        });

        // expect(handle!.style.left).to.equal('25%');
        // expect(progress!.style.width).to.equal('25%');
      });
    });
  });

  describe('when disabled', () => {
    const value = 5;
    const min = 1;
    const max = 10;

    let onChange: (value: number) => void;
    let select: (automationId: string) => HTMLElement | null;
    let waitForDom: (expectation: Function) => Promise<void>;

    beforeEach(() => {
      onChange = sinon.spy();
      const rendered = clientRenderer.render(
        <Slider
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          disabled={true}
        />
      );
      select = rendered.select;
      waitForDom = rendered.waitForDom;
    });

    it('should not change value', async () => {
      await waitFor(() => {
        const element = select('SLIDER');
        const handle = select('SLIDER-HANDLE');
        const progress = select('SLIDER-PROGRESS');
        const bounds = element!.getBoundingClientRect();

        simulate.mouseDown(element, {
          currentTarget: element!,
          clientY: bounds.top + bounds.height/3,
          clientX: bounds.left + bounds.width/4
        });

        expect(handle!.style.left).not.to.equal('25%');
        expect(progress!.style.width).not.to.equal('25%');
      });
    });
  });
});
