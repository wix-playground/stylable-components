**Table of Contents**

- [Definition](#definition)
- [Elements](#elements)
- [Slider States](#slider-states)
- [Slider Props](#slider-props)
- [UI Customizations](#ui-customizations)
- [Behavior](#behavior)
- [Keyboard](#keyboard)
- [Mouse](#mouse)
- [Error handling](#error-handling)
- [Accessibility](#accessibility)
- [Examples](#examples)
- [Simple](#simple)
- [Stepped](#stepped)
- [Horizontal / Vertical Axis](#horizontal-/-vertical)
- [Tooltip](#tooltip)



## Definition

A toggle switch is used as an on/off control



## Elements

![elements](/Users/maximc/Desktop/toggle/assets/elements.png)

**Toggle consists of:**  "switch", "icon" and "progress". The "switch" moves across the toggle "background"in order to turn on/off something. Icon, at the same time, represents if value is On or Off.



## Visual States

| State        | Description                         |
| ------------ | ----------------------------------- |
| On           | Toggle is on / checker              |
| Off          | Toggle is off / unchecked           |
| Hover on     | Toggle is on / checker & hovered    |
| Hover off    | Toggle is off / unchecked & hovered |
| Disabled on  | Toggle is on & disabled             |
| Disabled off | Toggle is off & disabled            |

Design [assets](https://zpl.io/1PLfpV)

## Props

See [README.md](./README.md) for more info.

## UI Customizations

Toggle can be customized using ::switch and ::background subcomponents.

See [README.md](./README.md) for more info.

## Behavior

User can hit toggle to switch value to on / off. 

Toggle can be rendered with & without icons (this is controlled by `displayIcon`, `iconChecked` & `iconUnchecked` properties).

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

For now accessibility for toggle is covered with keyboard behavior & label prop that shows text hint.

## Examples



## Design

Link to [assets](https://zpl.io/1PLfpV)