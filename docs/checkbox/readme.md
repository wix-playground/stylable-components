# Checkbox Component

**Checkbox** is a component designed to be similar to the native Checkbox implementation.

## Elements

## Component API

### Component Props

| name        | type       | default | required | description       |
| ----------- | ---------- | ------- | -------- | ----------------- |
| value | boolean | false | no | The checked value of the checkbox. |
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

### CSS States (pseudo-classes)

| state | description |
|-------|--------------|
| :checked | Used to style component when checked. |
| :disabled | Used to style component when disabled. |
| :indeterminate | Used to style component when value indeterminate. |
| :readonly | Used to style component when in readonly mode. |
| :focused | Used to style component whit gains focus. |

### Style Code Example

* Set a custom icon for the checkbox

```css
@namespace "MyAwsomeComp";

:import {
    -st-from: "stylable-components/dist/src/components/checkbox/checkbox.st.css";
    -st-default: CB;
}

:import {
    -st-from: './checkbox-custom-mixins';
    -st-named: customBoxIconMixin, customTickIconMixin;
}

.customDemo{
    -st-extends: CB;
}

.customDemo::boxIcon   {
    -st-mixin: customBoxIconMixin('none', '#D1D1D1');
}

.customDemo::tickIcon {
    -st-mixin: customTickIconMixin('#f1f1f1');
}

.customDemo:checked::boxIcon {
    -st-mixin: customBoxIconMixin('goldenrod', '#D1D1D1');
}

```

```js

module.exports.customBoxIconMixin = function(params) {
    var fill = typeof params[0] === 'undefined' ? 'none' : params[0];
    var stroke = typeof params[1] === 'undefined' ? '#000000' : params[1];

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" fill="${fill}" stroke="${stroke}" ><path d="M.5.5h15v15H.5z" /></svg>')`
    }
}

module.exports.customTickIconMixin = function(params) {
    var fill = typeof params[0] === 'undefined' ? 'none' : params[0];

    return {
        'background-image': `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" focusable="false" fill="${fill}" ><circle cx="8" cy="8" r="4"/></svg>')`
    }
}

```
