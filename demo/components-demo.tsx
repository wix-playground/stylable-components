import * as React from 'react';
import { Link } from '../src';
import { TreeViewDemo } from './components/tree-view-demo';
const style = require('./style.css');
const resetStyle = require('../src/style/default-theme/base.css');

export class ComponentsDemo extends React.Component<{}, {}>{


    constructor() {
        super();
    }

    render() {
        return <div>
            <Link className={style.test} href="">My link</Link>
            <TreeViewDemo />
            <hr/>
            <div>
                <h2>button</h2>
                <table>
                    <tr>
                        <th>
                            <button>Normal</button>
                        </th>
                        <th>
                            <button disabled >Disabled</button>
                        </th>
                        <th>
                            <a className="button" href="http://www.wix.com" target="_blank">Link</a>
                        </th>
                        <th>
                            <a disabled className="button" href="http://www.wix.com" target="_blank">Disabled link</a>
                        </th>
                    </tr>
                </table>
            </div>
            <hr/>
            <div>
                <h2>anchor</h2>
                <table>
                    <tr>
                        <th>
                            <a href="http://www.wix.com" target="_blank">Normal</a>
                        </th>
                        <th>
                            <a disabled href="http://www.wix.com" target="_blank">Disabled</a>
                        </th>
                    </tr>
                </table>
            </div>

        </div>;
    }
}
