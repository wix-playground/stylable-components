# Slider

A **slider** an input where the user selects a value from within a given range.



## Elements

![elements](./assets/elements.png)

**Slider consists of:** ::bar, ::handle, ::progressBar, ::marks and ::progressMarks . The ::handle is dragged across the bar in order to give the slider a desired value. ::progressBar shows range from min value to the current value. ::marks and ::progressMarks are representing the step. "Tooltip" is showing the value.

### API

#### Props

| name           | type                                  | defaultValue | isRequired | description                              |
| -------------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| axis           | enum: 'x' 'x-reverse' 'y' 'y-reverse' | 'x'          |            | The axis on which the slider will slide. |
| value          | number                                | min          |            | Displays default OR actual value of the slider |
| min            | number                                | 0            |            | The absolute minimum of the slider's range |
| max            | number                                | 1            |            | The absolute maximum of the slider's range |
| step           | number OR string "any"                | 1            |            | Set the slider's step. If step = "number" it causes slider to move in discrete increments. If step = "any"  sliders moves along a subjective range. |
| required       | bool                                  | fasle        |            | Whether or not the slider is required in a form. |
| disabled       | bool                                  | false        |            | If true, the slider will not be interactive |
| label          | string                                |              |            | Text to display in accessibility mode    |
| name           | string                                |              |            | The name of the slider. Behaves like the name attribute of an input element. |
| displayMarks   | bool                                  | false        |            | Controls the visibility of the marks     |
| displayTooltip | bool                                  | false        |            | Controls the visibility of tooltip       |
| onChange       | func                                  |              | yes        | Callback function that is fired when the slider's value changed. Signature: `function(event: object, newValue: number): void` event: KeyDown event targeting the slider. newValue: The new value of the slider. |
| onDragStart    | func                                  |              |            | Callback function that is fired when the slider has begun to move. Signature `function(event: object) : void` event: MouseDown or TouchStart event targeting the slider. |
| onDragStop     | func                                  |              |            | Callback function that is fired when the slide has stopped moving. Signature `function(event: object) : void` event: MouseEnd or TouchEnd event targeting the slider. |
| error          | bool                                  | false        |            | Sets the `:error` CSS state on the `<slider>` |
| rtl            | bool                                  | false        |            | Makes the component RTL                  |



### Code Examples

#### **Example 1:**

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

Comments to example 1

**Example 2:**

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

Comments to example 2


## Style API

### Subcomponents (pseudo elements)

| selector        | description                              | note                                     |
| --------------- | ---------------------------------------- | ---------------------------------------- |
| ::handle        | Allows you to style the handle of the slider |                                          |
| ::bar           | Allows you to style the bar of the slider |                                          |
| ::progressBar   | Allows you to style the progress bar of the slider |                                          |
| ::marks         | Allows to style marks that are shown on the ::bar section of the slider | by default ::marks use the same background color as ::bar |
| ::progressMarks | Allows to style marks that are shown on the :progressBar section of the slider | by default ::progressMarks use the same background color as ::progressBar |
| ::tooltip       | Allows to style the tooltip              |                                          |



### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :hover, :focus, :disabled, etc | standard CSS pseudo state                |




### Style Code Examples

**Example 1:**

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

**Example 2:**

```
/* code example of the basic theme here? */
```
