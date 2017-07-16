import * as React from 'react';

export interface NumberInputProps extends React.HTMLProps<HTMLInputElement> {
}

export class NumberInput extends React.Component<NumberInputProps, {}>{
    static defaultProps: Partial<NumberInputProps> = { type: 'number' };

    render() {
        return <input {...this.props} />;
    }
}
