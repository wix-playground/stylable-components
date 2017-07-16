import * as React from 'react';
import { Link } from '../src';
import { TreeViewDemo } from './components/tree-view-demo';
import { BirthDatePickerDemo } from './components/birth-date-picker-demo';
const style = require('./style.css');

export class ComponentsDemo extends React.Component<{}, {}>{


    constructor() {
        super();
    }

    render() {
        return <div>
            <Link className={style.test} href="">My link</Link>
            <TreeViewDemo />
            <BirthDatePickerDemo />
        </div>;
    }
}
