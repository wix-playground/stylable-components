import * as React from 'react';
import { Link } from '../src';
import {DatePickerDemo} from './date-picker-demo';
import { TreeViewDemo } from './components/tree-view-demo';
const style = require('./style.css');

export class ComponentsDemo extends React.Component<{}, {}>{
    constructor() {
        super();
    }

    render() {
        return <div>
            <Link className={style.test} href="">My link</Link>
            <h1>{'<DatePicker />'}</h1>
            <DatePickerDemo />
            <TreeViewDemo />
        </div>;
    }
}
