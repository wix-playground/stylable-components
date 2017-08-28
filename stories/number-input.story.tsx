import * as React from 'react';

import {action} from '@storybook/addon-actions';
import {boolean, number, text, withKnobs} from '@storybook/addon-knobs';
import {linkTo} from '@storybook/addon-links';
import {storiesOf} from '@storybook/react';

import {NumberInput} from '../src';

storiesOf('NumberInput', module)
    .addDecorator(withKnobs)
    .add('uncontrolled', () => (
        <NumberInput
            placeholder={text('placeholder', 'How Many?')}
            defaultValue={number('defaultValue', 0)}
            disabled={boolean('disabled', false)}
            error={boolean('error', false)}
            onChange={action('onChange')}
            onInput={action('onInput')}
        />
    ))
    .add('controlled', () => (
        <NumberInput
            value={number('value', 0)}
            disabled={boolean('disabled', false)}
            error={boolean('error', false)}
            onChange={action('onChange')}
            onInput={action('onInput')}
        />
    ))
    .add('min, max and step', () => (
        <NumberInput
            min={number('min', -5)}
            max={number('max', 5)}
            step={number('step', 2)}
            disabled={boolean('disabled', false)}
            error={boolean('error', false)}
            onChange={action('onChange')}
            onInput={action('onInput')}
        />
    ));
