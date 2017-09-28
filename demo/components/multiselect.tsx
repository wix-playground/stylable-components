import React = require('react');
import {stylable} from 'wix-react-tools';
import {Multiselect} from '../../src/components/multiselect/multiselect';

export class MultiselectDemo extends React.Component {
    public state = {
        value: ['Tuesday']
    };

    private dataSource = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    public render() {
        return (
            <Multiselect
                dataSource={this.dataSource}
                value={this.state.value}
                onChange={this.handleSelectChange}
            />
        );
    }

    protected handleSelectChange = ({value}: {value: string[]}) => {
        this.setState({value});
    }
}
