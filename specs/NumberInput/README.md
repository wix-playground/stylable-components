# Number Input

The **NumberInput** component improves upon the native `<input type="number">` by providing ability to customize the stepper arrows design, a common React+Typescript API, and working out the kinks of native implementations.

### Component API

#### Props

| name        | type   | defaultValue | isRequired | description                              |
| ----------- | ------ | ------------ | ---------- | ---------------------------------------- |
| value       | number |              | yes        | Used to set & change the value of the input. You should bind this to the corresponding state in your parent component, and set the onChange handler, in order for the component to work |
| placeholder | string |              |            | Text to display if the value is null     |
| min         | number | 1            |            |                                          |
| max         | number | 100          |            |                                          |
| step        | number | 1            |            |                                          |
| required    | bool   | FALSE        |            | Whether or not filling the value is required in a form. |
| disabled    | bool   | FALSE        |            | If true, the component will not be interactable. |
| label       | string |              |            | Text to display in accessibility mode.   |
| name        | string |              |            | The name of the component. Behaves like the name attribute of an input element. |
| onChange    | func   |              | yes        | Callback function that is fired when the component's value is changed and committed. Signature: `function(event: object, newValue: number):void`. event: KeyDown event targeting the slider. newValue: The new value of the slider. |
| onInput     | func   |              |            | Callback function that is fired every time the user types a character into the input. |
| prefix      | node   | null         |            | Allows to prepend HTML content or a React component |
| suffix      | node   | null         |            | Allows to append HTML content or a React component |
| error       | bool   | false        |            | Sets the `:error` CSS state on the `<NumberInput/>` |
| rtl         | bool   | FALSE        |            | Makes the component RTL                  |

### Code Examples

#### **Example 1:**

```jsx
//TODO: code guys - fix code example!
import * as React from 'react';
import { NumberInput } from './components/NumberInput';
const style = require('./style.sb.css'); // link to Style file - see examples of style files below

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

Comments to example 1

**Example 2:**

```
// TODO: add examples for: suffix / prefix; passing error state
```

Comments to example 2



## Style API

#### Subcomponents (pseudo elements)

| selector  | description                            | type                                     |
| --------- | -------------------------------------- | ---------------------------------------- |
| ::stepper | Allows you to style the stepper arrows | Style the internal `<Stepper/>` component. This component exposes some internal styles. Consult the (Link to Documentation) to see which subcomponents and states are available |

*if a subcomponent is a COMPONENT, it might have subcomponents -> then we will link here to its documentation

#### Custom CSS States (pseudo classes)

| selector                       | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :hover, :focus, :disabled, etc | Standard CSS pseudo classes              |

#### Style Code Examples

**Example 1:**

```css
@import * from './components/slider'; /* TODO: fix the correct syntax */
/* style.sb.css 
Adding rules here (which may be shared between different components) allows us to 	    override specific parts; or even change the whole theme
*/
NumberInput {
  background: #bada55;
}

NumberInput::stepper {
  background-color: transparent;
}

NumberInput::stepper::down, NumberInput::stepper::up {
  color:blue;
}

NumberInput::stepper::down:hover, NumberInput::stepper::up:hover {
  background-color:lightblue;
}
```

**Example 2:**

```
/* code example of the basic theme here? */
```