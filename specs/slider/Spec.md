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

**Slider** is a component that allows users to input or select value from a range.

Sliders are great for adjusting settings that reflect intensity levels (volume, brightness, color saturation).



## Elements

![elements](./assets/elements.png)

**Slider consists of:** "bar", "handle" and "progress". The "handle" is dragged across the "bar" in order to give the slider a desired value while "progress" marks range from min value to current value. 

Also, you can add elements into it in the tooltip (e.g. to display value) and error slots, by passing the appropriate props (see component props).



## Visual States

| State    | Description                         |
| :------- | ----------------------------------- |
| Default  | Default component appearance        |
| Hover    | User hovered over bar OR handle     |
| Focus    | Browser is focused on the component |
| Active   | User clicks on bar OR handle        |
| Disabled | Component can not be changed        |

Design [assets](https://zpl.io/2kRTvO)



## Props

See [README.md](./README.md) for more info.



## UI Customizations

Slider can be customized using ::handle, ::bar and ::progress subcomponents.

See [README.md](./README.md) for more info.



## Behavior

User can drag handle over slider bar or click on the slider (in desired location) to select the value from the range.

Changing the value (keyboard) is performed **from current value**. E.g., if current value is 5.2, and step is 2, then UP will give us 7.2 (unless max is less than 7.2), and DOWN will give us 3.2.

Value can not exceed the min/max limits. If value is > or < than min/max it is automatically set to corresponding min/max.

The component follows the external control pattern (value & handle position is defined by the `value` property, and in order for the component to function, it should be bound to a state in the parent component, and the `onChange` handler should be set).

### Keyboard 

| Keys                     | Action                         |
| ------------------------ | ------------------------------ |
| up / right arrow key     | increase value                 |
| left / down arrow key    | decrease value                 |
| fn / ctrl + right / left | set max / min value            |
| fn / ctrl + up / down    | increase / decrease value by X |
| tab                      | moves to next element          |
| shift + tab              | moves to previous element      |
| enter                    | -                              |
| esc                      | removes focus (if in focus)    |

**RTL** orientation

| Keys                   | Action         |
| ---------------------- | -------------- |
| up  / left arrow key   | increase value |
| down / right arrow key | decrease value |



### Mouse

| Event             | Action                                   | NOTE                                     |
| ----------------- | ---------------------------------------- | ---------------------------------------- |
| hover             | highlight slider (both bar & handle)     | Event triggers on both bar & handle hover |
| click & drag      | moves handle one step forward / backwards | drag right/up -> increase value  \| drag down/left -> decrease value |
| click (on handle) | highlights handle                        | -                                        |
| click (on bar)    | moves handle to position where user clicked | -                                        |



### Touch

| Event           | Action                                   | NOTE                                     |
| --------------- | ---------------------------------------- | ---------------------------------------- |
| tap (on handle) | highlights handle                        | we need the ability to expand clickable area for mobile devices |
| tap (on bar)    | moves handle to position where user clicked | -                                        |
| drag            | moves handle according to drag           | -                                        |

NOTE: 
Later phases of touch handling are going to be implemented using mix in solution that Amir is working on (comment from Gilad).


###### Links to ARIA compliant sliders (for reference): 

http://files.paciellogroup.com/blogmisc/ARIA/slider/
https://www.w3.org/TR/wai-aria-practices/examples/slider/slider-2.html



## Error handling

| Error                                    | Handling                                 |
| ---------------------------------------- | ---------------------------------------- |
| value out of min/max range               | Show error in console and set value to corresponding min/max |
| value out of step (e.g. min=0 / max=20, step=5, value=7) | Show error in console, handle displays on 7. User can scroll right to increase value (in this case 7 will change to 12 . Once we reach slider end value will change from 17 to 20, since value can not be > max) |



## Accessibility

According to ARIA documentation, accessibility for slider is mostly covered with keyboard behavior.
The only accessibility issue that is not covered with slider is the absence of number input that it connected to this slider. But this is not a part of the spec (can be fixed by adding number input to slider).

reference links: 
https://www.paciellogroup.com/blog/2008/05/aria-slider-part-1/
https://www.paciellogroup.com/blog/2008/06/aria-slider-part-2/



## Examples

#### Simple

The `defaultValue` property sets the initial position of the slider. 

![simpleExample](./assets/simpleExample.png)



#### Stepped

By default, the slider is continuous. The step property causes the slider to move in discrete increments.



![steppedExample](./assets/steppedExample.png)

<!--see Fan slider for reference - https://www.w3.org/TR/wai-aria-practices/examples/slider/slider-2.html-->



#### Horizontal / Vertical Axis

The orientation of the slider can be reversed and rotated using the axis prop.

![axisExample](./assets/axisExample.png)

#### Tooltip

Tooltip display & customizations can be done via "tooltip" prop.  Link to [README.md](./README.md). 

![tooltipExample](./assets/tooltipExample.png)

Questions to research / answer: 

1. How do we define tooltip position (top, bottom, left, right)




## Design

Link to [assets](https://zpl.io/2kRTvO)