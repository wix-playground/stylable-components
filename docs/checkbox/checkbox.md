# Checkbox Component Specifications

**Table of Contents**

- [Description](#description)

- [Elements](#elements)

- [API](#api)

- [States](#states)

- [Accessibility](#accessibility)

- [Behavior](#behavior)

- [Input Methods](#input-methods)
  - [Keyboard](#keyboard)
  - [Mouse](#mouse)
  - [Touch](#touch)

  ​



## Description

Checkbox is usually used to supply a number of selection options and allow multiple selections. This component is similar to the native HTML checkbox implementation.



### Elements

**Checkbox** is consisted of: **box**, **tick mark** and **indeterminate mark**. This component accepts children that will be displayed next to the box and be used as a label.




## API

**Props**

See [README.md](./README.md) for more info. 

**Style**

**Checkbox** can be customized with ::boxIcon, ::tickIcon and ::indeterminateIcon.
See [README.md](./README.md) for more info. 



## States


| State   | Description                              | Link to design |
| :------ | :--------------------------------------- | -------------- |
| Hover   | User hovered over the checkbox  OR its' children          |                |
| Checked | The checkbox is checked                |
| Disabled | The checkbox is disabled. Value can't be changed               |
| Indeterminate | The checkbox is indeterminate                |
| Read-only | The checkbox value can't be changed. Doesn't appear disabled                |
| Focused | The checkbox has focus                |

Design [assets](https://zpl.io/2kRTvO)



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



### Behavior
This component mimics the native HTML checkbox behavior. See [MDN checkbox web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) for more details.


## Input Methods

#### Keyboard

| Keys      | Action                      |
| --------- | --------------------------- |
| space       | toggles the checkbox value       |



#### Mouse

| Event | Action                | NOTE                     |
| ----- | --------------------- | ------------------------ |
| hover | toggles hover state |  |
| click | toggles the checkbox value                      |                          |



#### **Touch**

| Event | Action              | NOTE                    |
| ----- | ------------------- | ----------------------- |
| tap   | toggles the checkbox value |  |


