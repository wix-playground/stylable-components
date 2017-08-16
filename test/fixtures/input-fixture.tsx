import * as React from 'react';

export interface InputFixtureProps {
    value: string;
    onChange: (e: string) => void;
}

export interface InputFixtureState {
    checked: boolean;
}

export class InputFixture extends React.Component<InputFixtureProps, InputFixtureState> {
    public state = {checked: false};
    public render() {
        return (
            <input
                type="radio"
                value={this.props.value}
                checked={this.state.checked}
                onClick={this.handleClick}
                data-automation-id="INPUT_FIXTURE"
            />);
    }

    private handleClick = () => {
        this.setState({checked: !this.state.checked});
        this.props.onChange(this.props.value);
    }
}
