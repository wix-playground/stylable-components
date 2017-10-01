**Table of Contents**

- [Definition](#definition)
- [Elements](#elements)
- [Slider States](#slider-states)
- [Slider Props](#slider-props)
- [UI Customizations](#ui-customizations)
- [Behavior](#behavior)
  - [Keyboard](#keyboard)
  - [Mouse](#mouse)
  - [Touch](#touch)
- [Error handling](#error-handling)
- [Accessibility](#accessibility)
- [Examples](#examples)



## Definition

A toggle switch is used as an on/off control



## Elements

![elements](./assets/elements.png)

**Toggle consists of:**  "switch" and "icon". The "switch" moves across the toggle in order to set the value to On / Off and "icon" indicates the state of the value.



## Visual States

| State          | Description                         |
| -------------- | ----------------------------------- |
| On             | Toggle is on / checker              |
| Off            | Toggle is off / unchecked           |
| On + hover     | Toggle is on / checker & hovered    |
| Off + hover    | Toggle is off / unchecked & hovered |
| On + disabled  | Toggle is on & disabled             |
| Off + disabled | Toggle is off & disabled            |

Design [assets](https://zpl.io/1PLfpV)

## Props

See [README.md](./README.md) for more info.

## UI Customizations

Toggle can be customized using ::switch subcomponent.

See [README.md](./README.md) for more info.

## Behavior

User can hit toggle to switch between on / off value. 

Toggle can be rendered with & without icons (this is controlled by `Toggle::switch` and `Toggle:checked::switch` selectors. For more info see [README.md](./README.md)).

The component follows the external control pattern (value & handle position is defined by the `value` property, and in order for the component to function, it should be bound to a state in the parent component, and the `onChange` handler should be set).

### Keyboard

| Keys        | Action                                   |
| ----------- | ---------------------------------------- |
| tab         | moves to next element                    |
| shift + tab | moves to previous element                |
| enter       | -                                        |
| space       | switch toggle to On / Off correspondingly (if toggle is in focus) |
| esc         | removes focus (if in focus)              |

**RTL** orientation does not change keyboard behavior



### Mouse

| Event                 | Action                                   | NOTE                                     |
| --------------------- | ---------------------------------------- | ---------------------------------------- |
| hover                 | highlight toggle (both switch & background) | Event triggers on both switch & background hover |
| click (on switch)     | switch toggle to On / Off correspondingly | Event triggers on Mouse Release event    |
| click (on background) | switch toggle to On / Off correspondingly | Event triggers on Mouse Release event    |



### Touch

| Event               | Action                                   | NOTE                            |
| ------------------- | ---------------------------------------- | ------------------------------- |
| tap (on handle)     | switch toggle to On / Off correspondingly | Event triggers on Touch Release |
| tap (on background) | switch toggle to On / Off correspondingly | Event triggers on Touch Release |



## Error handling

TBD

## Accessibility

##### Keyboard

When the toggle has focus, pressing the Space key changes the state of the toggle.
See [W3C](https://www.w3.org/TR/wai-aria-practices/#checkbox) for reference.

##### Focus

Toggle should have a focus state. Focus state looks like a square border around the entire component.

![toggleFocus](./assets/toggleFocus.png)

**Roles & Attributes**

| Role       | Attribute              | Element | Usage                                    |
| ---------- | ---------------------- | ------- | ---------------------------------------- |
| `checkbox` |                        | `div`   | The `role="checkbox"` attribute identifies the `div`element as a ARIA `checkbox`.The accessible name comes the child text content of the `div[role="checkbox"]` element.The `checkbox` widget needs a `tabindex="0"` value. |
|            | `tabindex="0"`         | `div`   | The `div["checkbox"]` is identified as an ineractive element and is added to the tab order of the page by setting the `tabindex="0"`. |
|            | `aria-checked="false"` | `div`   | Identifies the `checkbox` button as unchecked. CSS attribute selectors (e.g. `[aria-checked="false"]`) are used to synchronize the visual states with the value of the `aria-checked`attribute. |
|            | `aria-checked="true"`  | `div`   | Identifies the `checkbox` as checked. CSS attribute selectors (e.g. `[aria-checked="true"]`) are used to synchronize the visual states with the value of the `aria-checked` attribute. |

See ARIA doc for reference:
https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-1/checkbox-1.html
https://www.w3.org/TR/wai-aria-practices/#checkbox

## Examples

1. Put here the example of component with icons for On / Off states

    ```.root::switch {
    .root::switch {    
    	background-image: url('unckecked-icon.svg');
    }
    .root:checked::switch {
        background-image: url('ckecked-icon.svg');
    }
    ```

2. Put here the example of component with No icons 

3. Put here the example of component with custom style


Examples will be here once component is done. 

## Design

Link to [assets](https://zpl.io/1PLfpV)