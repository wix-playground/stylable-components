import * as React from 'react';
import { DatePicker } from '../src';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

@observer
export class DatePickerDemo extends React.Component<{}, {}> {
    @observable date: Date = new Date();

    @action onChange = (value: Date) => {
        this.date = value;
    };

    render () {
        return <DatePicker date={this.date} onChange={this.onChange} />;
    }
}
