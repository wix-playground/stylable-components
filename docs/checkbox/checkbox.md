# Checkbox Component Specifications

Support a similar to native checkbox implementation.

## Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| value | boolean | false | no | The value chosen in the checkbox |
| onChange | (event : ChangeEvent) => void | NOOP | no | Event triggered by changing the value |
| children | Array<Node> | null | no | children | Any further nodes will be rendered after the checkbox element |
| indeterminate | boolean | false | no | indicates that the checkbox is neither on nor off. Changes the appearance to resemble a third state. Does not affect the value of the checked attribute, and clicking the checkbox will set the value to false. |
| disabled | boolean | false | no | Whether the checkbox responds to events or not |
| readonly | boolean | false | no | Gains tab focus but user cannot change value |
| id | string | null | no | Unique identifier |
| name | string | null | no | Specifies the name of the input element |
| tabIndex | number | null | no | Tab order of the element |
| aria-label | string | null | no | aria attribute |
| aria-labelledby | string | null | no | aria attribute |
| aria-describedby | string | null | no | aria attribute |
| aria-controls | string | null | no | list of ids of controls used for implementing an intermediate state |

## Styling

| Name | Description |
| -- | -- |
| boxIcon | sets ths style for the empty checkbox
| tickIcon | Sets the style for the checked state |
| indeterminateIcon | Sets the style for the indeterminate state |

## Accessibility

### Roles

* Root role - *checkbox*

### Aria Attributes
* Text content attributes - aria-label, aria-labelledby, aria-describedby
* When checked the checkbox has aria-checked set to true, otherwise aria-checked is set to false. When the checkbox is in an indeterminate state, the aria-checked is set to mixed.
* aria-controls="list of idrefs" - identifies the checkboxes controlled by a mixed checkbox. This should be added to the checkbox component props. See [w3c](https://www.w3.org/TR/wai-aria/states_and_properties#aria-controls) explanation.

### Focus

* Focus will reside on the checkbox using the hidden input element. Tabindex (defaults to 0, depending on what is given to the component from the user).

## Input Handling

### Keyboard Navigation

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Space</kbd> changes the state of the checkbox. Note the state change to indeterminate will be available only when determined so by logic, so implementation should explicitly enable this state only when relevant. Otherwise state should be toggled between checked and unchecked.
