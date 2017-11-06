# Checkbox Component

The **Checkbox** component provides the same functionality as the native Checkbox implementation with optional styling using Wix **Stylable**.

## API

### Properties

| name              | type            | default | required | description                              |
| ----------------- | --------------- | ------- | -------- | ---------------------------------------- |
| value             | boolean         | false   | no       | The value chosen in the checkbox.        |
| onChange          | function        | NOOP    | no       | Event triggered by changing the value.<br>`(event : ChangeEvent) => void` |
| disabled          | boolean         | false   | no       | Whether the checkbox responds to events. |
| readOnly          | boolean         | false   | no       | Gains tab focus but user cannot change value. |
| tabIndex          | number          | 0       | no       | Determines the order by which the component gains tab focus. |
| id                | string          |         | no       | Puts an ID property to be used for HTML labels. |
| children          | React.ReactNode | null    | no       | children                                 |
| boxIcon           | React component |         | no       | Component representing an empty state.   |
| indeterminateIcon | React component |         | no       | Component representing an indeterminate state. |
| tickIcon          | React component |         | no       | Component representing a checked state. This will be overlayed on top of the boxIcon. |
| indeterminate     | boolean         | false   | no       | Indicates that the checkbox is neither on nor off. Changes the appearance to resemble a third state. Does not affect the value of the checked attribute, and clicking the checkbox will set the value to false. |
| autoFocus         | boolean         | false   | no       | Whether the checkbox receives focus automatically when page loads |
| name              | string          |         | no       | Name is used for form data reference     |


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

### Subcomponents (pseudo-elements)

| selector            | description                              |
| ------------------- | ---------------------------------------- |
| ::box               | Frame of the checkbox                    |
| ::icon              | Positioning and size for both icons      |
| ::tickIcon          | Graphic of the Checkmark icon. Use `background-image` to change |
| ::indeterminateIcon | Graphic of the Indeterminate icon. Use `background-image` to change |



### Custom CSS States (pseudo-classes)

| state          | description                              |
| -------------- | ---------------------------------------- |
| :checked       | Used to style component when checked.    |
| :disabled      | Used to style component when disabled.   |
| :indeterminate | Used to style component when value indeterminate. |
| :readonly      | Used to style component when in readonly mode. |
| :focused       | Used to style component when gains focus. |

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
    stroke: #d1d1d1;
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
