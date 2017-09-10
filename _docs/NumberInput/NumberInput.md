# NumberInput Component

**NumberInput** is a form-element component that enables inputting values of the type number. The values can be confined to a specific range, and the "step" (or increment) between the values can be defined.

The NumberInput component improves upon the native `<input type="number">`:

* provides ability to customize the stepper arrows design
* provides a common React+Typescript API
* works out the kinks of native implementations


## Elements

![NumberInput examples](./assets/numberInput.png)

**NumberInput** consists of:

* a native **input** subcomponent
* a **stepper** subcomponent which provides customisable Up and Down buttons

Also, you can add elements into it using the **prefix** and **suffix** slots, by passing the component children with the corresponding data-slot attributes.

## Component API

### Component Props

| name        | type                                  | default | required | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| value       | number |              | yes        | Used to set & change the value of the input. You should bind this to the corresponding state in your parent component, and set the onChange handler, in order for the component to work |
| placeholder | string |              |            | Text to display if the value is null     |
| min         | number |            |            |                                          |
| max         | number |           |            |                                          |
| step        | number | 1            |            |                                          |
| required    | bool   | false        |            | Whether or not filling the value is required in a form. |
| disabled    | bool   | false        |            | If true, the component will not be interactable. |
| label       | string |              |            | Text to display in accessibility mode.   |
| name        | string |              |            | The name of the component. Behaves like the name attribute of an input element. |
| onChange    | function   |              | yes (if value)  | Callback function that is fired when the component's value is changed and committed.<br>`function(event: object, newValue: number):void`.<br>● event: KeyDown event targeting the slider.<br>● newValue: The new value of the slider. |
| onInput     | function   |              |            | Callback function that is fired every time the user types a character into the input. |
| error       | bool   | false        |            | Sets the `:error` CSS state. |
| rtl         | bool   | false        |            | Makes the component RTL. |  

### Accepted Children

This component accepts children with the following `data-slot` attributes to be displayed in specific places in its layout.

The children in **NumberInput** use the data-slot attribute to assign roles to themselves. If **NumberInput** recognizes the roles, it connects the child components to the corresponding elements (according to the table below) and displays them in their designated places in the **NumberInput** layout.

| data-slot | description                              | example                                  |
| --------- | ---------------------------------------- | ---------------------------------------- |
| prefix    | Allows you to insert a component (or components) at the start of the input | `<div data-slot="prefix">hello world</div>` |
| suffix    | Allows you to insert a component (or components) at the end of the input | `<div data-slot="suffix">hello world</div>` |

## Code Examples

#### Simple example

```jsx
//TODO: code guys - fix code example!
import * as React from 'react';
import { NumberInput } from './components/NumberInput';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{
    constructor() {
        super();
    }

    render() {
        return <NumberInput 
        		 value="{this.state.numberInputValue}"
                 onChange={/* something */} 
                 />;
    }
}
```

#### Example with children

```jsx
//TODO: code guys - fix code example!
import * as React from 'react';
import { NumberInput } from './components/NumberInput';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{
    constructor() {
        super();
    }

    render() {
        return <NumberInput
        		 value="{this.state.numberInputValue}"
                 onChange={/* something */}>
    				<span data-slot="prefix">$</span>
        			<button data-slot="suffix">x</button>
               </NumberInput>;
    }
}
```

## Style API

### Subcomponents (pseudo elements)

| selector   | description                              | type                                     |
| ---------- | ---------------------------------------- | ---------------------------------------- |
| ::stepper | Allows you to style the stepper arrows. | Style the internal `<Stepper/>` component. This component exposes some internal styles. Consult the (Link to Documentation) to see which subcomponents and states are available. |

### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :hover, :focus, :disabled, etc | Standard CSS pseudo classes              |



### Style Code Example

```css
@import * from './components/NumberInput'; /* TODO: fix the correct syntax */
/* style.st.css 
Adding rules here (which may be shared between different components) allows us to 	    override specific parts; or even change the whole theme
*/

NumberInput {
  background: #bada55;
}

NumberInput::stepper {
  background-color: transparent;
}

NumberInput::stepper::prev, NumberInput::stepper::next {
  color:blue;
}

NumberInput::stepper::prev:hover, NumberInput::stepper::next:hover {
  background-color:lightblue;
}
```
