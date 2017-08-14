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
| disabled | boolean | false | no | Whether the checkbox responds to events or not |
| readonly | boolean | false | no | Gains tab focus but user cannot change value |
| ariaLabel | string | null | no | aria attribute |
| ariaLabeledBy | string | null | no | aria attribute |
| ariaDescribedBy | string | null | no | aria attribute |
| ariaControls | string | null | no | list of ids of controls used for implementing an intermediate state |

## Styling

| Name | Description |
| -- | -- |
| boxIconDefault | sets ths style for the empty checkbox
| tickIcon | Sets the style for the checked state |
| indeterminateIcon | Sets the style for the indeterminate state |

## Accessibility

The checkbox will implement a native HTML input element in order to support the HTML for attribute. The element should have both ```display:none``` and ```visibility:hidden``` styles implemented. The visibility is needed since some accessibility tools do not support display.

### Roles

* Root role - checkbox

### Aria Attributes
* Text content attributes - aria-label, aria-labelledby, aria-describedby
* When checked the checkbox has aria-checked set to true, otherwise aria-checked is set to false. When the checkbox is in an indeterminate state, the aria-checked is set mixed.
* aria-controls="list of idrefs" - identifies the checkboxes controlled by a mixed checkbox. This should be added to the checkbox component props.

### Focus

* The div of the checkbox will set to tabindex="0" by default.

## Input Handling

### Keyboard Navigation

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Space</kbd> changes the state of the checkbox. Note the state change to indeterminate will be available only when determined so by logic, so implementation should explicitly enable this state only when relevant. Otherwise state should be toggled between checked and unchecked.
