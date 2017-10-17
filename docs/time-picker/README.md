# Time Picker Component

Time Picker allows users to select time and switch between time formats ( AM/PM & 24h ).



## Elements

![elements](./assets/elements.png)

The **Time Picker** component improves upon the native `<input type="time">` by providing ability to customize the stepper arrows design, a common React+Typescript API, and working out the kinks of native implementations



## API

### Component Props

| name        | type                            | defaultValue   | isRequired | description                              |
| ----------- | ------------------------------- | -------------- | ---------- | ---------------------------------------- |
| value       | string                          |                | yes        | Sets and represents time shown in the time picker. <br> Accepts strings in 24h format (12:54). |
| placeholder | string                          |                |            | Text to display if the value is null.    |
| format      | enum:<br>    `ampm` <br> `24hr` | system default |            | Tells the component to display the picker in ampm (12hr) format or 24hr format. |
| required    | bool                            | false          |            | Whether or not filling the value is required in a form. |
| disabled    | bool                            | false          |            | If `true`, the componentName will not be interactive. |
| label       | string                          |                |            | Text to display in accessibility mode.   |
| name        | string                          |                |            | The name of the slider. Behaves like the name attribute of an input element. |
| prefix      | node                            |                |            | Inserts a component at the start of the input. |
| suffix      | node                            |                |            | Inserts a component at the end of the input. |
| error       | bool                            | false          |            | Sets the `:error` CSS state on the `<timePicker>`. |



### Code Example

**Example 1:**

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

*Comments to example 1*

**Example 2:**

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

*Comments to example 2*



## Style API

### Subcomponents (pseudo-elements)

| selector      | description                            | type                                     |
| :------------ | -------------------------------------- | ---------------------------------------- |
| ::stepper     | Allows you to style the stepper arrows | Style the internal `<Stepper/>` component. This component exposes some internal styles. Consult the (Link to Documentation) to see which subcomponents and states are available |
| ::placeholder | Allows you to style the placeholder    | HTML Element. This subcomponents has no subcomponents of its own* |

You can change color of `::placeholder` subcomponent by changing `color` property.

```css
TimePicker::placeholder {
	color: red;
}
```


### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
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
