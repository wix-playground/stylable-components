import * as React from 'react';

export interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
}

export class TextInput extends React.Component<TextInputProps, {}>{
    static defaultProps: Partial<TextInputProps> = { type: 'text' };

    componentDidMount() {
        window.navigator
    }

    render() {
        return <input {...this.props} />;
    }
}
