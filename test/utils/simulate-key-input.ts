import {simulate} from 'test-drive-react';

export default function simulateKeyInput(
    input: HTMLInputElement,
    value: string
) {
    input.value += value;
    simulate.change(input);
}
