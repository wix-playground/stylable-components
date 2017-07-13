import * as React from 'react';
import { Link } from '../src';
import { RadioGroupDemo } from './radio-group-demo'


const style = require('./style.css');

export class ComponentsDemo extends React.Component<{}, {}>{


    constructor() {
        super();
    }

    render() {
        return <div>
            <Link className={style.test} href="">My link</Link>

            <RadioGroupDemo/>
        </div>;
    }
}
