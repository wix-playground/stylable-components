import {simulate} from 'test-drive-react';

const inputs = new WeakSet();

export default function simulateKeyInput(
    input: HTMLInputElement,
    value: string
) {
    if (inputs.has(input)) {
        input.value += value;
    } else {
        input.value = value;
        inputs.add(input);
    }
    simulate.change(input);
}
