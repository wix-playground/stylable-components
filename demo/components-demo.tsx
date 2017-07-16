import * as React from 'react';
import { Link } from '../src';
import { TreeViewDemo } from './components/tree-view-demo';
import { RadioGroupDemo } from './components/radio-group-demo'

const style = require('./style.css');

export class ComponentsDemo extends React.Component<{}, {}>{


    constructor() {
        super();
    }

    render() {
        return <div>
            <Link className={style.test} href="">My link</Link>
            <TreeViewDemo />
            <RadioGroupDemo/>
        </div>;
    }
}
