import * as React from 'react';

export interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
}

export class TextInput extends React.Component<TextInputProps, {}>{
    static defaultProps: Partial<TextInputProps> = { type: 'text' };

    render() {
        return <input {...this.props} />;
    }
}
