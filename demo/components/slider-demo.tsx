import * as React from 'react';
import {SBComponent} from 'stylable-react-component';
import {Slider} from '../../src';
import style from './slider-demo.st.css';

export interface SliderDemoState {
    value: number;
}

@SBComponent(style)
export class SliderDemo extends React.Component<{}, SliderDemoState> {
    constructor(props: {}) {
        super(props);

        this.onSliderChange = this.onSliderChange.bind(this);

        this.state = {
            value: 50
        };
    }

    public render() {
        const min = 0;
        const max = 100;
        const headerCellStyles = style['table-head-cell'];

        return (
            <table cellSpacing="24px">
                <thead>
                <tr>
                    <th className={headerCellStyles}>Default Slider</th>
                    <th className={headerCellStyles}>Disabled Slider</th>
                    <th className={headerCellStyles}>Slider with step</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <Slider
                            value={this.state.value}
                            min={min}
                            max={max}
                            onChange={this.onSliderChange}
                        />
                    </td>
                    <td>
                        <Slider
                            value={this.state.value}
                            min={min}
                            max={max}
                            disabled={true}
                            onChange={this.onSliderChange}
                        />
                    </td>
                    <td>
                        <Slider
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
                    <th className={headerCellStyles}>Slider with error state</th>
                    <th className={headerCellStyles}>Slider with label</th>
                    <th className={headerCellStyles} />
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <Slider
                            value={this.state.value}
                            min={min}
                            max={max}
                            error={true}
                            onChange={this.onSliderChange}
                        />
                    </td>
                    <td>
                        <Slider
                            value={this.state.value}
                            min={min}
                            max={max}
                            label={`It's simple slider.`}
                            onChange={this.onSliderChange}
                        />
                    </td>
                    <td />
                </tr>
                </tbody>
                <thead>
                <tr>
                    <th className={headerCellStyles}>Slider axis="y"</th>
                    <th className={headerCellStyles}>Slider axis="x-reverse"</th>
                    <th className={headerCellStyles}>Slider axis="y-reverse"</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <Slider
                            axis={'y'}
                            value={this.state.value}
                            min={min}
                            max={max}
                            onChange={this.onSliderChange}
                        />
                    </td>
                    <td>
                        <Slider
                            axis={'x-reverse'}
                            value={this.state.value}
                            min={min}
                            max={max}
                            onChange={this.onSliderChange}
                        />
                    </td>
                    <td>
                        <Slider
                            axis={'y-reverse'}
                            value={this.state.value}
                            min={min}
                            max={max}
                            onChange={this.onSliderChange}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }

    private onSliderChange(value: number) {
        this.setState({value});
    }
}
