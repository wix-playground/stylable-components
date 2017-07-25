# Checkbox Component Specifications

Support a similar to native checkbox implementation.

## Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| value | boolean | false | no | The value chosen in the checkbox |
| boxIcon | React.SFC<CheckBoxIconProps> | boxIcon | no | SVG representing an empty state |
| indeterminateIcon | React.SFC<CheckBoxIconProps> | indeterminateIcon | no | SVG representing an indeterminate state|
| tickIcon | React.SFC<CheckBoxIconProps> | tickIcon | no | SVG representing an SVG representing a checked state |
| onChange | func | NOOP | no | Event triggered by changing the value |
| children | Array<Node> | null | no | children | Any further nodes will be rendered, although the use case for this is suspicious |
| indeterminate | boolean | false | no | indicates that the checkbox is neither on nor off. Changes the appearance to resemble a third state. Does not affect the value of the checked attribute, and clicking the checkbox will set the value to false. |

## Styling

| Name | Description |
| -- | -- |
| boxIconDefault | sets ths style for the empty checkbox
| tickIcon | Sets the style for the checked state |
| indeterminateIcon | Sets the style for the indeterminate state |
| label | Sets the style for the checkbox label |
