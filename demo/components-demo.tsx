import * as React from 'react';

import {AutoCompleteDemo} from './components/auto-complete.demo';
import {CheckBoxDemo} from './components/checkbox-demo';
import {DatePickerDemo} from './components/date-picker-demo';
import {DropDownDemo} from './components/drop-down.demo';
import {ImageDemo} from './components/image-demo';
import {ModalDemo} from './components/modal-demo';
import {NumberInputDemo} from './components/number-input.demo';
import {PopupDemo} from './components/popup-demo';
import {RadioGroupDemo} from './components/radio-group-demo';
import {SelectionListDemo} from './components/selection-list-demo';
import {SliderDemo} from './components/slider-demo';
import {TimePickerDemo} from './components/time-picker-demo';
import {ToggleDemo} from './components/toggle-demo';
import {TreeViewDemo, TreeViewDemoCustom} from './components/tree-view-demo';

import {Button, Input} from '../src';

export class ComponentsDemo extends React.Component {
    public render() {
        return (
            <div>
                <ImageDemo />
                <hr />
                <DropDownDemo />
                <hr />
                <AutoCompleteDemo />
                <hr />
                <div>
                    <h2>CheckBox</h2>
                    <CheckBoxDemo />
                </div>
                <hr />
                <div>
                    <h2>TreeView</h2>
                    <TreeViewDemo />
                    <hr />
                    <TreeViewDemoCustom />
                </div>
                <hr />
                <div>
                    <h2>TimePicker</h2>
                    <TimePickerDemo/>
                </div>
                <hr/>
                <div>
                    <h2>Toggle</h2>
                    <ToggleDemo />
                </div>
                <hr/>
                <div>
                    <h2>Slider</h2>
                    <SliderDemo />
                </div>
                <hr />
                <div>
                    <h2>DatePicker</h2>
                    <DatePickerDemo />
                </div>
                <hr />
                <div>
                    <h2>SelectionList</h2>
                    <SelectionListDemo />
                </div>
                <hr />
                <div>
                    <h2>Radio Group</h2>
                    <RadioGroupDemo />
                </div>
                <hr />
                <div>
                    <h2>Typography</h2>
                    <table>
                        <tbody>
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
                        </tbody>
                    </table>
                </div>
                <hr />
                <div>
                    <h2>Button</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <Button className="btnLarge">Large</Button>
                                </th>
                                <th>
                                    <Button>Normal</Button>
                                </th>
                                <th>
                                    <Button className="btnSmall">Small</Button>
                                </th>
                                <th>
                                    <Button className="btnTiny">Tiny</Button>
                                </th>
                                <th>
                                    <Button disabled>Disabled</Button>
                                </th>
                                <th>
                                    <Button href="http://www.wix.com" target="_blank">Link</Button>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <Button className="btnSecondary btnLarge">Large</Button>
                                </td>
                                <td>
                                    <Button className="btnSecondary">Normal</Button>
                                </td>
                                <td>
                                    <Button className="btnSecondary btnSmall">Small</Button>
                                </td>
                                <td>
                                    <Button className="btnSecondary btnTiny">Tiny</Button>
                                </td>
                                <td>
                                    <Button className="btnSecondary" disabled>Disabled</Button>
                                </td>
                                <td>
                                    <Button
                                        className="btnSecondary"
                                        href="http://www.wix.com"
                                        target="_blank"
                                    >
                                        Link
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button className="btnWhite btnLarge">Large</Button>
                                </td>
                                <td>
                                    <Button className="btnWhite">Normal</Button>
                                </td>
                                <td>
                                    <Button className="btnWhite btnSmall">Small</Button>
                                </td>
                                <td>
                                    <Button className="btnWhite btnTiny">Tiny</Button>
                                </td>
                                <td>
                                    <Button className="btnWhite" disabled>Disabled</Button>
                                </td>
                                <td>
                                    <Button className="btnWhite" href="http://www.wix.com" target="_blank">Link</Button>
                                </td>
                            </tr>
                            <tr style={{backgroundColor: '#162d3d', border: 'none'}}>
                                <td>
                                    <Button className="btnWhiteSecondary btnLarge">Large</Button>
                                </td>
                                <td>
                                    <Button className="btnWhiteSecondary">Normal</Button>
                                </td>
                                <td>
                                    <Button className="btnWhiteSecondary btnSmall">Small</Button>
                                </td>
                                <td>
                                    <Button className="btnWhiteSecondary btnTiny">Tiny</Button>
                                </td>
                                <td>
                                    <Button className="btnWhiteSecondary" disabled>Disabled</Button>
                                </td>
                                <td>
                                    <Button
                                        className="btnWhiteSecondary"
                                        href="http://www.wix.com"
                                        target="_blank"
                                    >
                                        Link
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button className="btnError btnLarge">Large</Button>
                                </td>
                                <td>
                                    <Button className="btnError">Normal</Button>
                                </td>
                                <td>
                                    <Button className="btnError btnSmall">Small</Button>
                                </td>
                                <td>
                                    <Button className="btnError btnTiny">Tiny</Button>
                                </td>
                                <td>
                                    <Button className="btnError" disabled>Disabled</Button>
                                </td>
                                <td>
                                    <Button className="btnError" href="http://www.wix.com" target="_blank">Link</Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button className="btnErrorSecondary btnLarge">Large</Button>
                                </td>
                                <td>
                                    <Button className="btnErrorSecondary">Normal</Button>
                                </td>
                                <td>
                                    <Button className="btnErrorSecondary btnSmall">Small</Button>
                                </td>
                                <td>
                                    <Button className="btnErrorSecondary btnTiny">Tiny</Button>
                                </td>
                                <td>
                                    <Button className="btnErrorSecondary" disabled>Disabled</Button>
                                </td>
                                <td>
                                    <Button
                                        className="btnErrorSecondary"
                                        href="http://www.wix.com"
                                        target="_blank"
                                    >
                                        Link
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button className="btnPremium btnLarge">Large</Button>
                                </td>
                                <td>
                                    <Button className="btnPremium">Normal</Button>
                                </td>
                                <td>
                                    <Button className="btnPremium btnSmall">Small</Button>
                                </td>
                                <td>
                                    <Button className="btnPremium btnTiny">Tiny</Button>
                                </td>
                                <td>
                                    <Button className="btnPremium" disabled>Disabled</Button>
                                </td>
                                <td>
                                    <Button
                                        className="btnPremium"
                                        href="http://www.wix.com"
                                        target="_blank"
                                    >
                                        Link
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button className="btnPremiumSecondary btnLarge">Large</Button>
                                </td>
                                <td>
                                    <Button className="btnPremiumSecondary">Normal</Button>
                                </td>
                                <td>
                                    <Button className="btnPremiumSecondary btnSmall">Small</Button>
                                </td>
                                <td>
                                    <Button className="btnPremiumSecondary btnTiny">Tiny</Button>
                                </td>
                                <td>
                                    <Button className="btnPremiumSecondary" disabled>Disabled</Button>
                                </td>
                                <td>
                                    <Button
                                        className="btnPremiumSecondary"
                                        href="http://www.wix.com"
                                        target="_blank"
                                    >
                                        Link
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button className="btnTransparent btnLarge">Large</Button>
                                </td>
                                <td>
                                    <Button className="btnTransparent">Normal</Button>
                                </td>
                                <td>
                                    <Button className="btnTransparent btnSmall">Small</Button>
                                </td>
                                <td>
                                    <Button className="btnTransparent btnTiny">Tiny</Button>
                                </td>
                                <td>
                                    <Button className="btnTransparent" disabled>Disabled</Button>
                                </td>
                                <td>
                                    <Button
                                        className="btnTransparent"
                                        href="http://www.wix.com"
                                        target="_blank"
                                    >
                                        Link
                                    </Button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <hr />
                <div>
                    <h2>Anchor</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <a href="http://www.wix.com" target="_blank">Normal</a>
                                </th>
                                <th>
                                    <a href="http://www.wix.com" target="_blank">Disabled</a>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <div>
                    <h2>Input</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <Input placeholder="Placeholder" />
                                </th>
                                <th>
                                    <Input placeholder="Disabled" disabled />
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <div>
                    <h2>Popup</h2>
                    <PopupDemo/>
                </div>
                <hr />
                <div>
                    <h2>NumberInput</h2>
                    <NumberInputDemo />
                </div>
                <hr />
                <div>
                    <h2>Modal</h2>
                    <ModalDemo />
                </div>
            </div>
        );
    }
}
