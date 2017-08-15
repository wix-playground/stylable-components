import {simulate} from 'test-drive-react';

export function simulateKeyInput(
    input: HTMLInputElement,
    value: string
) {
    input.value += value;
    simulate.change(input);
}
