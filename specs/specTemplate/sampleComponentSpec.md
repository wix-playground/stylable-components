**Table of Contents**

- [Definition](#definition)
- [Elements](#elements)
- [Props](#props)
- [Style](#style)
- [Accessibility](#accessibility)
- [Behavior](#behavior)
  - [Edge case handling](edge-case-handling)
  - [Keyboard](#keyboard)
  - [Mouse](#mouse)
  - [Touch](#touch)
- [Examples](#examples)
- [Design](#design)

  ​

## Definition

Brief component description

> e.g.
> **Slider** is a component that allows users to input or select value from a range.
> Sliders are great for adjusting settings that reflect intensity levels (volume, brightness, color saturation).



## Elements

Screenshot & brief elements description

> e.g.
> Screenshot of the component (http://joxi.ru/bmonQewtMy479r)
> **Slider consists of:** "bar", "handle" and "progress". The "handle" is dragged across the "bar" in order to give the slider a desired value while "progress" marks range from min value to current value. 



## Props

See [README.md](./README.md) for more info. 



## Style

Brief description of pseudo-classes and custom CSS states that can be applied to the component.
See [README.md](./README.md) for more info. 



## Accessibility

Describe how do we cover accessibility issues in current component



##### Keyboard

> Specific cases related to keyboard behavior (if any)

##### Focus

> Describe focus behavior (e.g. different components can have different focus states)

##### Reference links

> Links to similar ARIA compatible components for reference



## Behavior

Detailed description of how input behaves. Logic, corner cases, patterns, etc.



### Edge case handling 

| Edge case                                | Handling                                 |
| ---------------------------------------- | ---------------------------------------- |
| value out of min/max range               | Show error in console and set value to corresponding min/max |
| value out of step (e.g. min=0 / max=20, step=5, value=7) | Show error in console, handle displays on 7. User can increase value (in this case 7 will change to 10) OR decrease value (7 will change to 5) and after that step will work as expected. |



### Keyboard

| Keys      | Action                      |
| --------- | --------------------------- |
| tab       | moves to next element       |
| shift+tab | moves to previous element   |
| esc       | removes focus (if on focus) |
| enter     |                             |

**RTL** orientation ( if applicable )

| Keys | Action |
| ---- | ------ |
|      |        |



### Mouse

| Event | Action                | NOTE                     |
| ----- | --------------------- | ------------------------ |
| hover | what happens on hover | Side notes (if relevant) |
| click |                       |                          |



### Touch

| Event | Action              | NOTE                    |
| ----- | ------------------- | ----------------------- |
| tap   | what happens on tap | Side note (if relevant) |
| drag  |                     |                         |


## Design

Link to [assets](link goes here)
