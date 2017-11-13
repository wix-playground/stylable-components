# Slider

**Slider** is a component that allows users to input or select a value from a range.

Sliders are great for adjusting settings that reflect intensity levels (volume, brightness, color saturation).


## Elements

![elements](./assets/elements.png)

**Slider** is composed of the following elements:

* **bar**: represents full range of values.
* **handle**: dragged across the **bar** and **progress** bar to change value.
* **progressBar**: represents range from minimum value to current value.
* **marks**: value steps of **bar**.
* **progressMarks**: value steps of **progressBar**.
* **tooltip**: optional display of the current value, enabled by setting the `displayTooltip` prop to `true`.


## API

### Props

| name             | type                                     | defaultValue | isRequired | description                              |
| ---------------- | ---------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| axis             | enum:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>'x'<br>'x-reverse'<br>'y'<br>'y-reverse' | 'x'          | no         | The axis on which the slider will slide. |
| value            | number                                   | min          | no         | Displays default OR actual value of the slider. |
| min              | number                                   | 0            | no         | The absolute minimum of the slider's range. |
| max              | number                                   | 1            | no         | The absolute maximum of the slider's range. |
| step             | number OR string "any"                   | 1            | no         | Set the slider's step method. If step is set to a number, it causes the **handle** to move in discrete increments. If step is set to the string "any", the **handle** moves along a subjective range. |
| required         | boolean                                  | false        | no         | Whether or not the slider is required in a form. |
| disabled         | boolean                                  | false        | no         | If true, the slider will not be interactive. |
| label            | string                                   |              | no         | Text to display in accessibility mode.   |
| name             | string                                   |              | no         | The name of the slider. Behaves like the name attribute of an input element. |
| displayStopMarks | boolean                                  | false        | no         | Controls the visibility of the marks.    |
| displayTooltip   | boolean                                  | false        | no         | Controls the visibility of the tooltip.  |
| tooltipPosition  | enum:<br>'top'<br>'bottom'<br>'left'<br>'right' | 'top'        | no         | Controls the position of the tooltip.    |
| onChange         | function                                 |              | yes        | Callback function that is fired when the slider's value changed.<br>`(event: {value: number}): void`<br>**event** change event for the component instance.<br>**value** the new value of the slider |
| onDragStart      | function                                 |              | no         | Callback function that is fired when the handle has begun to move.<br>`(event: PointerEvent): void`<br>**event**: mouse click down or touch start |
| onDragStop       | function                                 |              | no         | Callback function that is fired when the handle has stopped moving.<br>`(event: PointerEvent): void`<br>**event**: mouse click up or touch end |
| onDrag           | function                                 |              | no         | Callback function that is fired when the handle is moving.<br>`(event: PointerEvent): void`<br>**event**: mouse move or touch move |

### Code Examples

#### Example 1

```jsx
//TODO: code example should be updated when component is done
import * as React from 'react';
import { Slider } from './components/slider';
import style from './style.st.css'; // link to Style file - see examples of style files below

type State = {
  sliderValue: number
}

export class ComponentsDemo extends React.Component<{}, State>{
  	state: State,

    constructor() {
        super();
    },

    public render() {
        return <Slider
                 value="{this.state.sliderValue}"
                 onChange={/* something */}
          		/>;
    }
}
```

#### Example 2

```jsx
//TODO: code example should be updated when component is done
import * as React from 'react';
import { Slider } from './components/slider';
import style from './style.st.css'; // link to Style file - see examples of style files below

type State = {
  sliderValue: number
}

export class ComponentsDemo extends React.Component<{}, State>{
  	state: State,

    constructor() {
        super();
    },

    public render() {
        return <Slider
                 value="{this.state.sliderValue}"
                 onChange={/* something */}>
                 	<span data-slot="tooltip"></span>
          	   </Slider>;
    }
}
```

## Style API

### Subcomponents (pseudo elements)

| selector    | description                              | note                                     |
| ----------- | ---------------------------------------- | ---------------------------------------- |
| ::handle    | Allows you to style the handle of the slider. |                                          |
| ::bar       | Allows you to style the bar of the slider. |                                          |
| ::rangeBar  | Allows you to style the progress bar of the slider. |                                          |
| ::mark      | Allows you to style marks that are shown on the ::bar section of the slider. | By default ::marks use the same background color as ::bar. |
| ::rangeMark | Allows you to style marks that are shown on the ::progressBar section of the slider. | By default, ::progressMark elements use the same background color as ::progressBar. |

### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true. |
| :x                             | Horizontal component orientation         |
| :xReverse                      | Horizontal reversed component orientation (as in RTL, for example) |
| :y                             | Vertical component orientation           |
| :yReverse                      | Vertical reversed component orientation  |
| :hover, :focus, :disabled, etc | Standard CSS pseudo states.              |

### Style Code Examples

#### Example 1

```css
@import * from './components/slider'; 
/* TODO: fix the correct syntax */
/* style.st.css
Adding rules here (which may be shared between different components) allows us to override specific parts; or even change the whole theme
*/
Slider {
  background: transparent;
}

Slider::bar {
  background-color: #bada55; /* although the whole look comes from the theme, we override the background color of the slider bar */
}

Slider::handle {
  background-color: #0099ff;
}

Slider::handle:hover {
  background-color: #33ccff;
}

Slider:disabled::handle {
  background-color: gray;
}
```
