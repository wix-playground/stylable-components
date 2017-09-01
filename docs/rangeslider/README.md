# Range Slider

A **range slider** is an input where the user selects a range of values from within a given/predefined range.	



### Elements

![elements](./assets/elements.png)



The handles are dragged across the bar in order to give the slider a desired range. Marks and range marks are representing the step. Clickable area represents the area where user can interact with slider (e.g. drag handles & change range) 

**Range Slider consists of:** 
::bar - represents sliders given range 
::rangeBar - represents selected range from within a given range
::handles - are dragged across the bar in order to set/change range
::marks - represent step
::rangeMarks - represent step that it displayed within ::rangeBar	

### API

#### Props

| name        | type                                  | defaultValue | isRequired | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| value       | array of numbers                      | [2, 5]       |            | Difference between values represent slider's selected range. Each number represents one handle. The more values the more handles. |
| allowCross  | bool                                  | true         |            | If true, allows ::handles to cross       |
| axis        | enum: 'x' 'x-reverse' 'y' 'y-reverse' | 'x'          |            | The axis on which the slider will slide  |
| min         | number                                | 0            |            | The absolute minimum of the slider's range |
| max         | number                                | 1            |            | The absolute maximum of the slider's range |
| step        | number OR string "any"                | 1            |            | Set the slider's step. If step = "number" it causes slider to move in discrete increments. If step = "any" sliders moves along a subjective range |
| required    | bool                                  | fasle        |            | Whether or not the slider is required in a form |
| disabled    | bool                                  | false        |            | If true, the slider will not be interactive |
| label       | string                                |              |            | Text to display in accessibility mode    |
| name        | string                                |              |            | The name of the slider. Behaves like the name attribute of an input element |
| marks       | bool                                  | false        |            | Controls the visibility of the marks     |
| onChange    | func                                  |              | yes        | Callback function that is fired when the slider's value changed. Signature: `function(event: object, newValue: number): void` event: KeyDown event targeting the slider. newValue: The new value of the slider. |
| onDragStart | func                                  |              |            | Callback function that is fired when the slider has begun to move. Signature `function(event: object) : void` event: MouseDown or TouchStart event targeting the slider. |
| onDragStop  | func                                  |              |            | Callback function that is fired when the slide has stopped moving. Signature `function(event: object) : void` event: MouseEnd or TouchEnd event targeting the slider. |
| error       | bool                                  | FALSE        |            | Sets the `:error` CSS state on the `<slider>` |
| rtl         | bool                                  | FALSE        |            | Makes the component RTL                  |



#### Accepted Children

> TBD (need to decide on how to implement tooltip)

This component accepts children with the following `data-slot` attribute, in order to be displayed in specific places in its layout ( in this case child position is connected to ::handle)

| data-slot | description                              | example                                  |
| --------- | ---------------------------------------- | ---------------------------------------- |
| tooltip   | Allows you to insert a component (or components) above the input | `<div data-slot="tooltip">hello world</div>` |



### Code Examples

#### **Example 1:**

```jsx
//TODO: code example should be updated when component is done
import * as React from 'react';
import { RangeSlider } from './components/rangeslider';
import style from './style.st.css'; // link to Style file - see examples of style files below

type State = {
  rangesliderValue: number
}

export class ComponentsDemo extends React.Component<{}, State>{
  	state: State,

    constructor() {
        super();
    },

    public render() {
        return <RangeSlider
                 value="{this.state.rangesliderValue}"
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
import { RangeSlider } from './components/rangeslider';
import style from './style.st.css'; // link to Style file - see examples of style files below

type State = {
  rangesliderValue: number
}

export class ComponentsDemo extends React.Component<{}, State>{
  	state: State,

    constructor() {
        super();
    },

    public render() {
        return <RangeSlider
                 value="{this.state.rangesliderValue}"
                 onChange={/* something */}>
                 	<span data-slot="tooltip"></span>
          	   </RangeSlider>;
    }
}
```

Comments to example 2



## Style API

### Subcomponents (pseudo elements)

| selector     | description                              | note                                     |
| ------------ | ---------------------------------------- | ---------------------------------------- |
| ::handles    | Allows to style the handles of the slider | For now there is no way to style each handle separately |
| ::bar        | Allows to style the bar of the slider    |                                          |
| ::rangeBar   | Allows to style the section of the bar that represents selected range |                                          |
| ::marks      | Allows to style marks that are shown on the ::bar section of the slider | by default ::marks use the same background color as ::bar |
| ::rangeMarks | Allows to style marks that are shown on the :rangeBar section of the slider | by default ::rangeMarks use the same background color as ::rangeBar |

### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :hover, :focus, :disabled, etc | standard CSS pseudo state                |



### Style Code Examples

**Example 1:**

```css
@import * from './components/rangeslider'; 
/* TODO: fix the correct syntax */
/* style.st.css
Adding rules here (which may be shared between different components) allows us to override specific parts or even change the whole theme
*/
RangeSlider {
  background: transparent;
}

RangeSlider::bar {
  background-color: #bada55; 
/* although the whole look comes from the theme, we override the background color of the range slider bar */
}

RangeSlider::handle {
  background-color: #0099ff;
}

RangeSlider::handle:hover {
  background-color: #33ccff;
}

RangeSlider:disabled::handle {
  background-color: gray;
}
```

**Example 2:**

```
/* code example of the basic theme here? */
```