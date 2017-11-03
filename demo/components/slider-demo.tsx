import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {ChangeEvent, ContextProvider, Slider, SliderValue, TooltipPosition} from '../../src';
import style from './slider-demo.st.css';

export interface SliderDemoState {
    value: SliderValue;
    multiValue: SliderValue;
    rawValue: string;
    rawMultiValue: string;
    tooltipPosition?: TooltipPosition;
}

@stylable(style)
export class SliderDemo extends React.Component<{}, SliderDemoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value: 50,
            multiValue: [20, 80],
            rawValue: '50',
            rawMultiValue: '[80, 80]'
        };
    }

    public render() {
        const min = 0;
        const max = 100;

        return (
            <table cellSpacing="24px">
                <thead>
                    <tr>
                        <td>value: {this.state.value}</td>
                    </tr>
                    <tr>
                        <td>rawValue: {this.state.rawValue}</td>
                    </tr>
                    <tr>
                        <th className="table-head-cell">Default Slider</th>
                        <th className="table-head-cell">Disabled Slider</th>
                        <th className="table-head-cell">Slider with step</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Slider
                                data-automation-id="SLIDER_DEFAULT"
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td>
                            <Slider
                                data-automation-id="SLIDER_DISABLED"
                                value={this.state.value}
                                min={min}
                                max={max}
                                disabled={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td>
                            <Slider
                                data-automation-id="SLIDER_WITH_STEP"
                                value={this.state.value}
                                min={min}
                                max={max}
                                step={10}
                                onChange={this.onSliderChange}
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th className="table-head-cell">
                            Slider with error state<br />
                            <span style={{color: '#777', fontSize: '12px'}}>To be continued...</span>
                        </th>
                        <th className="table-head-cell">Slider with label</th>
                        <th className="table-head-cell">
                            <span>Slider with tooltip</span>
                            <select
                                defaultValue={this.state.tooltipPosition}
                                onChange={this.onTooltipChange}
                            >
                                <option value="">default</option>
                                {['top', 'bottom', 'left', 'right'].map((tooltipPosition: TooltipPosition) =>
                                    <option
                                        key={tooltipPosition}
                                        children={tooltipPosition}
                                        value={tooltipPosition}
                                    />
                                )}
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Slider
                                data-automation-id="SLIDER_ERROR"
                                value={this.state.value}
                                min={min}
                                max={max}
                                error={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td>
                            <Slider
                                data-automation-id="SLIDER_WITH_LABEL"
                                value={this.state.value}
                                min={min}
                                max={max}
                                label="It's simple slider."
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td>
                            <Slider
                                data-automation-id="SLIDER_WITH_TOOLTIP"
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                                onInput={this.onSliderInput}
                                displayTooltip
                                tooltipPosition={this.state.tooltipPosition}
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th className="table-head-cell">Slider axis="y"</th>
                        <th className="table-head-cell">Slider axis="x-reverse"</th>
                        <th className="table-head-cell">Slider axis="y-reverse"</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="vertical-demo">
                            <Slider
                                data-automation-id="SLIDER_Y"
                                axis={'y'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td className="vertical-demo">
                            <Slider
                                data-automation-id="SLIDER_X_REVERSE"
                                axis={'x-reverse'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td className="vertical-demo">
                            <Slider
                                data-automation-id="SLIDER_Y_REVERSE"
                                axis={'y-reverse'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                onChange={this.onSliderChange}
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th className="table-head-cell">Slider with marks</th>
                        <th className="table-head-cell">Vertical Slider with marks</th>
                        <th className="table-head-cell">Reverse Slider with marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="vertical-demo">
                            <Slider
                                data-automation-id="SLIDER_WITH_MARKS"
                                value={this.state.value}
                                min={min}
                                max={max}
                                step={10}
                                displayStopMarks={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td className="vertical-demo">
                            <Slider
                                data-automation-id="SLIDER_WITH_MARKS_VERTICAL"
                                axis={'y'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                step={10}
                                displayStopMarks={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                        <td className="vertical-demo">
                            <Slider
                                data-automation-id="SLIDER_WITH_MARKS_REVERSE"
                                axis={'x-reverse'}
                                value={this.state.value}
                                min={min}
                                max={max}
                                step={10}
                                displayStopMarks={true}
                                onChange={this.onSliderChange}
                            />
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th className="table-head-cell">Slider with RTL</th>
                        <th className="table-head-cell">Reverse Slider with RTL</th>
                        <th className="table-head-cell">Slider with RTL and marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ContextProvider
                                dir="rtl"
                            >
                                <Slider
                                    data-automation-id="SLIDER_RTL"
                                    value={this.state.value}
                                    min={min}
                                    max={max}
                                    onChange={this.onSliderChange}
                                />
                            </ContextProvider>
                        </td>
                        <td>
                            <ContextProvider
                                dir="rtl"
                            >
                                <Slider
                                    data-automation-id="SLIDER_RTL_REVERSE"
                                    value={this.state.value}
                                    min={min}
                                    max={max}
                                    axis="x-reverse"
                                    onChange={this.onSliderChange}
                                />
                            </ContextProvider>
                        </td>
                        <td>
                            <ContextProvider
                                dir="rtl"
                            >
                                <Slider
                                    data-automation-id="SLIDER_RTL_MARKS"
                                    value={this.state.value}
                                    min={min}
                                    max={max}
                                    step={10}
                                    displayStopMarks={true}
                                    onChange={this.onSliderChange}
                                />
                            </ContextProvider>
                        </td>
                    </tr>
                </tbody>
                <thead>
                <tr>
                    <td>multiValue: {
                        Array.isArray(this.state.multiValue) ? this.state.multiValue.join(', ') : this.state.multiValue
                    }</td>
                </tr>
                <tr>
                    <td>rawMultiValue: {this.state.rawMultiValue}</td>
                </tr>
                <tr>
                    <th className="table-head-cell">Default Range Slider</th>
                    <th className="table-head-cell">Disabled Range Slider</th>
                    <th className="table-head-cell">Range Slider with step and marks</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <Slider
                            data-automation-id="RANGE_SLIDER"
                            value={this.state.multiValue}
                            min={min}
                            max={max}
                            onChange={this.onRangeSliderChange}
                            onInput={this.onRangeSliderInput}
                        />
                    </td>
                    <td>
                        <Slider
                            data-automation-id="RANGE_SLIDER_DISABLED"
                            value={this.state.multiValue}
                            min={min}
                            max={max}
                            disabled={true}
                            onChange={this.onRangeSliderChange}
                            onInput={this.onRangeSliderInput}
                        />
                    </td>
                    <td>
                        <Slider
                            data-automation-id="RANGE_SLIDER_STEP_MARKS"
                            value={this.state.multiValue}
                            min={min}
                            max={max}
                            step={10}
                            displayStopMarks={true}
                            onChange={this.onRangeSliderChange}
                            onInput={this.onRangeSliderInput}
                        />
                    </td>
                </tr>
                </tbody>
                <thead>
                <tr>
                    <th className="table-head-cell">Range Slider with disableCross</th>
                    <th className="table-head-cell">Range Slider with tooltip</th>
                    <th className="table-head-cell">Range Slider RTL</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <Slider
                            data-automation-id="RANGE_SLIDER_DISABLE_CROSS"
                            value={this.state.multiValue}
                            disableCross
                            min={min}
                            max={max}
                            onChange={this.onRangeSliderChange}
                            onInput={this.onRangeSliderInput}
                        />
                    </td>
                    <td>
                        <Slider
                            data-automation-id="RANGE_SLIDER_TOOLTIP"
                            value={this.state.multiValue}
                            min={min}
                            max={max}
                            onChange={this.onRangeSliderChange}
                            onInput={this.onRangeSliderInput}
                            displayTooltip
                        />
                    </td>
                    <td>
                        <ContextProvider
                            dir="rtl"
                        >
                            <Slider
                                data-automation-id="RANGE_SLIDER_RTL"
                                value={this.state.multiValue}
                                min={min}
                                max={max}
                                onChange={this.onRangeSliderChange}
                                onInput={this.onRangeSliderInput}
                            />
                        </ContextProvider>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }

    private onSliderChange = ({value}: ChangeEvent<number[]>) => {
        this.setState({
            value,
            rawValue: String(value)
        });
    }

    private onRangeSliderChange = ({value}: ChangeEvent<number[]>) => {
        this.setState({
            multiValue: value
        });
    }
    private onRangeSliderInput = ({value}: ChangeEvent<string>) => {
        this.setState({rawMultiValue: value});
    }

    private onSliderInput = ({value}: ChangeEvent<string>) => {
        this.setState({
            rawValue: value
        });
    }

    private onTooltipChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        this.setState({
            tooltipPosition: e.currentTarget.value as TooltipPosition
        });
    }
}
