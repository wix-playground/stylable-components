# Checkbox Component

**Checkbox** is a component designed to be similar to the native Checkbox implementation.

## Elements

## Component API

### Component Props

| name        | type                                  | default | required | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| value | boolean | false | no | The checked value of the checkbox. |
| boxIcon | React.SFC\<CheckBoxIconProps> | boxIcon | no | SVG representing an empty state. |
| indeterminateIcon | React.SFC\<CheckBoxIconProps> | indeterminateIcon | no | SVG representing an indeterminate state. |
| tickIcon | React.SFC\<CheckBoxIconProps> | tickIcon | no | SVG representing an SVG representing a checked state. |
| onChange | function | NOOP | no | Event triggered by changing the value. |
| children | Array\<Node> | null | no | children | Any further nodes will be rendered. |
| indeterminate | boolean | false | no | Indicates that the checkbox is neither on nor off. Changes the appearance to resemble a third state. Does not affect the value of the checked attribute, and clicking the checkbox will set the value to false. |
| disabled | boolean | false | no | Whether the checkbox responds to events or not. |
| readonly | boolean | false | no | Gains tab focus but user cannot change value. |
| ariaLabel | string | null | no | aria attribute |
| ariaLabeledBy | string | null | no | aria attribute |
| ariaDescribedBy | string | null | no | aria attribute |
| ariaControls | string | null | no | List of IDs of controls used for implementing an intermediate state. |

### Code Example

> TBD

## Style API

### Subcomponents (pseudo elements)

selector   | description
--- | ---
boxIconDefault | Sets the style for the empty checkbox.
tickIcon | Sets the style for the checked state.
indeterminateIcon | Sets the style for the indeterminate state.

### Style Code Example

> TBD