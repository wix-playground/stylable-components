# Time Picker Component

The **TimePicker** component allows users to select the time and switch between time formats (AM/PM & 24h), and improves upon the native `<input type="time">` by providing:

* the ability to customize the stepper arrows style
* a common React+Typescript API
* works out the kinks of native implementations

## Elements

![elements](./assets/elements.png)

## API

### Component Props

| name        | type                            | defaultValue   | isRequired | description                              |
| ----------- | ------------------------------- | -------------- | ---------- | ---------------------------------------- |
| value       | string                          |                | yes        | Sets and represents the time shown in the current component instance.<br>Accepts strings in 24h format (12:54). |
| placeholder | string                          |                |            | Text to display if the value is null.    |
| format      | enum:<br>"ampm",<br>"24hr" | system default |            | Tells the component instance to present the time in ampm (12hr) format or 24hr format. |
| required    | boolean                            | false          |            | Whether or not filling the value is required in a form. |
| disabled    | boolean                            | false          |            | If `true`, the  component instance will not be interactive. |
| label       | string                          |                |            | Text to display in accessibility mode.   |
| name        | string                          |                |            | The name of the component instance. Behaves like the name attribute of an input element. |
| prefix      | node                            |                |            | Inserts a component at the start of the input. |
| suffix      | node                            |                |            | Inserts a component at the end of the input. |
| onChange     | function |   |   | Callback function that is fired on component blur.<br>`(event: {value: number}): void`<br>`event` KeyDown event targeting the component instance.<br>`newValue` The new value of the component instance. |
| onInput      |function |   |  | Callback function that is fired on every keydown event.<br> `(event: {value: number}): void`<br>`event` KeyDown event targeting the component instance.<br>`newValue` The new value of the component instance. |
| error       | boolean                            | false          |            | Sets the `:error` CSS state on the component instance. |

### Code Example

##### Example 1

```jsx
//TODO: code guys - fix code example!
import * as React from 'react';
import { TimePicker } from './components/TimePicker';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{
    constructor() {
        super();
    }

    render() {
        return <TimePicker
        		 value="{this.state.timePickerValue}"
                 onChange={/* something */}

                 />;
    }
}
```

##### Example 2

```jsx
//TODO: code guys - fix code example!
import * as React from 'react';
import { TimePicker } from './components/TimePicker';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{
    constructor() {
        super();
    }

    render() {
        return <TimePicker
        		 value="{this.state.timePickerValue}"
                 onChange={/* something */}>
    				<span data-slot="prefix">icon</span>
        			<button data-slot="suffix">smth</button>
               </TimePicker>;
    }
}
```

## Style API

### Subcomponents (pseudo-elements)

| selector      | description                            | type                                     |
| :------------ | -------------------------------------- | ---------------------------------------- |
| ::stepper     | Allows you to style the stepper arrows. | Style the internal `<Stepper/>` component. This component exposes some internal styles. |
| ::stepper::up   | Style the stepper UP arrow.   | Style the internal `<up/>` arrow component.|
| ::stepper::down | Style the stepper DOWN arrow. | Style the internal `<down/>` arrow component. |
| ::placeholder | Allows you to style the placeholder. | This subcomponent is an HTML Element and has no subcomponents of its own. |

You can change color of the `::placeholder` subcomponent by setting the `color` property.

```css
TimePicker::placeholder {
	color: red;
}
```


### Custom CSS States (pseudo-classes)

| state                   | description                              |
| ----------------------- | ---------------------------------------- |
| :error                  | Style the component instance on error, i.e. when the `error` prop is true. |
| :hover, :focus, :disabled, etc | Standard CSS states                      |



### Style Code Example

```css
@import * from './components/timePicker'; /* TODO: fix the correct syntax */
/* style.st.css
Adding rules here (which may be shared between different components) allows us to override specific parts; or even change the whole theme
*/
timePicker {
  background: #bada55;
}

timePicker::stepper {
  background-color: transparent;
}

timePicker::stepper::down, timeInput::stepper::up {
  color:blue;
}

timePicker::stepper::down:hover, timePicker::stepper::up:hover {
  background-color:lightblue;
}
```
