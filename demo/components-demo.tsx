import * as React from 'react';
import { Link } from '../src';
import {DatePickerDemo} from './date-picker-demo';
import { TreeViewDemo } from './components/tree-view-demo';
const style = require('./style.css');
const resetStyle = require('../src/style/default-theme/base.css');

export class ComponentsDemo extends React.Component<{}, {}>{
    constructor() {
        super();
    }

    render() {
        return <div>
<<<<<<< HEAD
            <Link className={style.test} href="">My link</Link>
            <h1>{'<DatePicker />'}</h1>
            <DatePickerDemo />
            <TreeViewDemo />
=======
            <div>
                <h2>TreeView</h2>
                <TreeViewDemo />
            </div>
            <hr />
            <div>
                <h2>Typography</h2>
                <table>
                    <tr>
                        <th>
                            <h1>H1</h1>
                        </th>
                        <th>
                            <h2>H2</h2>
                        </th>
                        <th>
                            <h3>H3</h3>
                        </th>
                        <th>
                            <h4>H4</h4>
                        </th>
                        <th>
                            <h5>H5</h5>
                        </th>
                        <th>
                            <h6>H6</h6>
                        </th>
                        <th>
                            <label>Label</label>
                        </th>
                        <th>
                            <p>paragraph</p>
                        </th>
                    </tr>
                </table>
            </div>
            <hr />
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
            <hr />
            <div>
                <h2>input</h2>
                <table>
                    <tr>
                        <th>
                            <input placeholder="Placeholder"/>
                        </th>
                        <th>
                            <input placeholder="Disabled" disabled/>
                        </th>
                    </tr>
                </table>
            </div>

>>>>>>> master
        </div>;
    }
}
