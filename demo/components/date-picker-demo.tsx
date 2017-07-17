import * as React from 'react';
import { DatePicker } from '../../src';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

@observer
export class DatePickerDemo extends React.Component<{}, {}> {
    render () {
        return <DatePicker placeholder="mm/dd/yyyy" />;
    }
}
