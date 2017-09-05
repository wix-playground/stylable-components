# Checkbox Component

**Checkbox** is a component designed to be similar to the native Checkbox implementation.

## Elements

### Component Props

| name        | type                                  | default | required | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| value | boolean | false | no | The checked value of the checkbox. |
| boxIcon | React component |  | no | Component representing an empty state. |
| indeterminateIcon | React component |  | no | Component representing an indeterminate state. |
| tickIcon | React component |  | no | Component representing a checked state. This will be overlayed on top of the boxIcon |
| onChange | ({value: boolean}) => void | NOOP | no | Event triggered by changing the value. |
| children | React Node | null | no | children | Any further nodes will be rendered. |
| indeterminate | boolean | false | no | Indicates that the checkbox is neither on nor off. Changes the appearance to resemble a third state. Does not affect the value of the checked attribute, and clicking the checkbox will set the value to false. |
| disabled | boolean | false | no | Whether the checkbox responds to events or not. |
| readonly | boolean | false | no | Gains tab focus but user cannot change value. |
| tabIndex | number | 0 | no | Determines the order by which the component gains tab focus. |
| id | string |  | no | Puts an "id" property to be used for HTML labels. |

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

### Subcomponents (pseudo elements)

selector   | description
--- | ---
boxIconDefault | Sets the style for the empty checkbox.
tickIcon | Sets the style for the checked state.
indeterminateIcon | Sets the style for the indeterminate state.

### Style Code Example

> TBD
