import * as React from 'react';
import { Link } from '../src';
const style = require('./style.css');
import {Provider} from 'mobx-react';

export class ComponentsDemo extends React.Component<{}, {}>{
    render() {
        return (
            <Provider>
                <div>
                    <Link className={style.test} href="">My link</Link>
                </div>
            </Provider>
        );
    }
}
