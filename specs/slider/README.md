# Slider Spec Template

**Slider** is a component that allows users to input or select value in a range.




### Component API

#### Props

| name          | type                                  | defaultValue | isRequired | description                              |
| ------------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| axis          | enum: 'x' 'x-reverse' 'y' 'y-reverse' | 'x'          |            | The axis on which the slider will slide. |
| value         | number                                | max          |            | Displays default OR actual value of the slider |
| defaultValue? |                                       |              |            |                                          |
| min           | number                                | 0            |            | The absolute minimum of the slider's range |
| max           | number                                | 1            |            | The absolute maximum of the slider's range |
| step          | number                                | 1            |            | The slider's step                        |
| required      | bool                                  | FALSE        |            | Whether or not the slider is required in a form. |
| disabled      | bool                                  | FALSE        |            | If true, the slider will not be interactable. |
| name          | string                                |              |            | The name of the slider. Behaves like the name attribute of an input element. |
| onChange      | func                                  |              | yes        | Callback function that is fired when the slider's value changed.Signature:function(event: object, newValue: number) => voidevent: KeyDown event targeting the slider.newValue: The new value of the slider. |
| onDragStart   | func                                  |              |            | Callback function that is fired when the slider has begun to move.Signature:function(event: object) => voidevent: MouseDown or TouchStart event targeting the slider. |
| onDragStop    | func                                  |              |            | Callback function that is fired when the slide has stopped moving.Signature:function(event: object) => voidevent: MouseEnd or TouchEnd event targeting the slider. |
| tooltip       | Component?                            | null         |            | You can pass a tooltip component into this prop, and it will be displayed on hover near the handle of the Slider |
| rtl           |                                       |              |            | NEED TO RESEARCH                         |



### Code Examples

#### **Example 1:**

```jsx
//TODO: code guys - fix code example!
import * as React from 'react';
import { Slider } from './components/slider';
const style = require('./style.sb.css'); // link to Style file - see examples of style files below

type State = {
  sliderValue: number
}

export class ComponentsDemo extends React.Component<{}, State>{
  	state: State,
    
    constructor() {
        super();
    },

    render() {
        return <div>
          	<prefix></prefix>
            <Slider 
                 onChange={newValue => this.setState({sliderValue: newValue})} // this should conform to the onChange API, please change 
              	 value="{this.state.sliderValue}"
                 tooltip="<div className='tooltip'>{this.state.sliderValue}</div>"
              	 prefix
              	 suffix
                 />
            <sufix></sufix>
          </div>;
    }
}
```

Comments to example 1 
Need to mention <prefix> & <suffix> use.



**Example 2:**

```max
//...example 2: give something interesting
```

Comments to example 2


## Style API

### Subcomponents (pseudo elements)

| selector   | description                              | type                                     |
| ---------- | ---------------------------------------- | ---------------------------------------- |
| ::handle   | Allows you to style the handle of the slider | HTML Element. This subcomponent has no subcomponents of its own* |
| ::bar      | Allows you to style the bar of the slider | HTML Element. This subcomponent has no subcomponents of its own* |
| ::progress | Allows you to style the progress part of the bar | HTML Element. This subcomponent has no subcomponents of its own* |

*if a subcomponent is a COMPONENT, it might have subcomponents -> then we will link here to its documentation

### Pseudo-classes (CSS States)

We call "pseudo-class" a "state". You can apply both standard & custom (link to Stylable documentation) CSS state to slider component 

| state               | description                              |
| ------------------- | ---------------------------------------- |
| :hover :hocus e.t.c | standard CSS state                       |
| :customStateName    | custom CSS state (allows you to be more customizable) |




### Code Examples

**Example 1:**

```css
@import * from './components/slider'; /* TODO: fix the correct syntax */
/* style.sb.css 
Adding rules here (which may be shared between different components) allows us to 	    override specific parts; or even change the whole theme
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
