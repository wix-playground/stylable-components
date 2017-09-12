# Checkbox Component

**Checkbox** is a component designed to be similar to the native Checkbox implementation.

## Elements

## Component API

### Component Props

| name        | type       | default | required | description       |
| ----------- | ---------- | ------- | -------- | ----------------- |
| value | boolean | false | no | The checked value of the checkbox. |
| boxIcon | React component |  | no | Component representing an empty state. |
| indeterminateIcon | React component |  | no | Component representing an indeterminate state. |
| tickIcon | React component |  | no | Component representing a checked state. This will be overlayed on top of the boxIcon. |
| onChange | function | NOOP | no | `({value: boolean}) => void`<br>Event triggered by changing the value. |
| children | React Node | null | no | children | Any further nodes will be rendered. |
| indeterminate | boolean | false | no | Indicates that the checkbox is neither on nor off. Changes the appearance to resemble a third state. Does not affect the value of the checked attribute, and clicking the checkbox will set the value to false. |
| disabled | boolean | false | no | Whether the checkbox responds to events. |
| readonly | boolean | false | no | Gains tab focus but user cannot change value. |
| tabIndex | number | 0 | no | Determines the order by which the component gains tab focus. |
| id | string |  | no | Puts an ID property to be used for HTML labels. |

### Code Example

```
import {CheckBox} from 'stylable-components';
import {SBComponent} from 'stylable-react-component';
import style from './checkbox-demo.st.css';

@SBComponent(style)
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

### CSS States (pseudo-classes)

| state | description |
|-------|--------------|
| :checked | Used to style component when checked. |
| :disabled | Used to style component when disabled. |
| :indeterminate | Used to style component when value indeterminate. |
| :readonly | Used to style component when in readonly mode. |
| :focused | Used to style component whit gains focus. |

### Style Code Example

> TBD
