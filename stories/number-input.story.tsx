import * as React from 'react';

import {action} from '@storybook/addon-actions';
import {boolean, number, text, withKnobs} from '@storybook/addon-knobs';
import {linkTo} from '@storybook/addon-links';
import {storiesOf} from '@storybook/react';

import {NumberInput} from '../src';

storiesOf('NumberInput', module)
    .addDecorator(withKnobs)
    .add('basic', () => (
        <NumberInput
            placeholder={text('placeholder', 'How Many?')}
            disabled={boolean('disabled', false)}
            error={boolean('error', false)}
            onChange={action('onChange')}
            onInput={action('onInput')}
        />
    ))
    .add('min, max and step', () => (
        <NumberInput
            placeholder={text('placeholder', 'min/max/step')}
            min={number('min', -5)}
            max={number('max', 5)}
            step={number('step', 2)}
            disabled={boolean('disabled', false)}
            error={boolean('error', false)}
            onChange={action('onChange')}
            onInput={action('onInput')}
        />
    ));
