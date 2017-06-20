import * as React from 'react';
import { Link } from '../src';
const style = require('./style.css');

export class ComponentsDemo extends React.Component<{}, {}>{
    render() {
        return <div>
            <Link className={style.test} href="">My link</Link>
        </div>;
    }
}
