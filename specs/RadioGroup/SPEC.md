# RadioGroup Component Specifications

Support a similar to native radiogroup implementations.

## Properties
| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------
| name | string |  | no | the name of the group. sets the _name_ property on each child |
| disabled | boolean | false | no | Whether all the radio buttons are disabled |
| readonly | boolean | false | no | Whether the group value cannot be changed |
| labelLocation | 'right' or 'left' | 'right' | no | Whether each child's value appears as text to the right or left of the radio button  |
| onChange | (e: RadioChangeEvent) => void | NOOP | no | Triggered by changing a radio button state |
| dataSource | Array\<RadioButtonProps> | [] | no | Array of dataSchema objects |
    

## Styling

Not relevant for radio group

## Accessibility

### Roles

* Root role - radiogroup
* Child role - radio

### Aria attributes

* Text content attributes relevant for the radiogroup - aria-label, aria-labelledby, aria-describedby.
* aria-checked is set to true on the checked radio button and set to false on the unchecked radio buttons.
* aria-activedescendant="ID_REF" - Applied to the element with the radiogroup role, tells assistive technologies which of the options, if any, is visually indicated as having keyboard focus. idref, refers to the ID of the focused option in the radio group. When navigation keys, such as Down Arrow, are pressed, the JavaScript changes the value.

### Focus

* Upon receiving focus:
  * If a radio button is checked, focus is set to the checked button
  * If no button is checked, focus is set to the first radio button
* Set tabindex="-1" on all radio buttons which are unchecked (apart from the first one if all are unchecked), otherwise set tabindex="0"

## Input Handling

### Keyboard Navigation

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Space</kbd> Checks the focused button if not already checked
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Up</kbd> or <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Left</kbd> move focus to the previous radio button in the group, uncheck the previously focused button, and check the newly focused button. If focus is on the first button, focus moves to the last button.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Down</kbd> or <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Right</kbd> move focus to the next radio button in the group, uncheck the previously focused button, and check the newly focused button. If focus is on the last button, focus moves to the first button.

