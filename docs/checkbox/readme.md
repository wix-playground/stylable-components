# Checkbox Component

**Checkbox** is a component designed to be similar to the native Checkbox implementation.

## Elements

## API

| name        | type       | default | required | description       |
| ----------- | ---------- | ------- | -------- | ----------------- |
| disabled | boolean | false | no | Whether the checkbox responds to events. |
| readonly | boolean | false | no | Gains tab focus but user cannot change value. |
| tabIndex | number | 0 | no | Determines the order by which the component gains tab focus. |
| id | string |  | no | Puts an ID property to be used for HTML labels. |
| value | boolean | false | no | The value chosen in the checkbox |
| onChange | (event : {value: boolean}): void | NOOP | no | Event triggered by changing the value |
| children | React.ReactNode | null | no | children | Any further nodes will be rendered after the checkbox element |
| boxIcon | React component |  | no | Component representing an empty state. |
| indeterminateIcon | React component |  | no | Component representing an indeterminate state. |
| tickIcon | React component |  | no | Component representing a checked state. This will be overlayed on top of the boxIcon. |
| indeterminate | boolean | false | no | Indicates that the checkbox is neither on nor off. Changes the appearance to resemble a third state. Does not affect the value of the checked attribute, and clicking the checkbox will set the value to false. |


### React Code Example

```
import {CheckBox} from 'stylable-components';
import {stylable} from 'wix-react-tools';
import style from './checkbox-demo.st.css';

@stylable(style)
export class BasicDemo extends React.Component<{}, {value: boolean}> {
    public state = {
        value: false
    };

    public render() {
        return (
            <div>
                <CheckBox
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <span className="label">Yes, I Approve</span>
                </CheckBox> <br/>
                <button disabled={!this.state.value}>
                    Proceed
                </button>
            </div>
        );
    }
    private handleChange = (e: {value: boolean}) => { this.setState({value: e.value}); };
}

```

## Style API

### Custom CSS States (pseudo-classes)

| state | description |
|-------|--------------|
| :checked | Used to style component when checked. |
| :disabled | Used to style component when disabled. |
| :indeterminate | Used to style component when value indeterminate. |
| :readonly | Used to style component when in readonly mode. |
| :focused | Used to style component whit gains focus. |

### Style Code Example

```css

@namespace "MyCheckBox";

:import {
    -st-from: "stylable-components/dist/src/components/checkbox/checkbox.st.css";
    -st-default: CB;
}

.customCheckBox {
     -st-extends: CB;
}

.customCheckBox::boxIcon {
    height: 20px;
    width: 20px;
    fill: none;
    stroke: #D1D1D1;
}

.customCheckBox:checked {
    fill: goldenrod;
}

.customCheckBox:focus {
    outline: none;
}

.customCheckBox::tickIcon {
    height: 20px;
    width: 20px;
    position: relative;
    margin-left: -20px;
    fill: #f1f1f1;
}

```
