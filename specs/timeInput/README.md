# Time Input Component

Time input allows users to select time and switch between time formats ( AM/PM & 24h ).



## ElementsScreenshot & brief elements description

![elements](./assets/elements.png)

The **Time Input** component improves upon the native `<input type="time">` by providing ability to customize the stepper arrows design, a common React+Typescript API, and working out the kinks of native implementations



## API

### Component Props

| name        | type    | defaultValue | isRequired | description                              |
| ----------- | ------- | ------------ | ---------- | ---------------------------------------- |
| value       |         |              |            |                                          |
| placeholder | string  |              |            | Text to display if the value is null     |
| format      | string  | "hh:mm"      |            | Sets the time format. 'hh:mm:ss'         |
| !use12Hours | bool    | true         |            | When `true` input uses 12h format & displays AM/PM |
| disabled    | boolean | false        |            | If `true`, the componentName will not be interactive. |
| label       | string  |              |            | Text to display in accessibility mode.   |
| name        | string  |              |            | The name of the slider. Behaves like the name attribute of an input element. |
| error       | bool    | FALSE        |            | Sets the `:error` CSS state on the `<slider>` |
| rtl         | bool    | FALSE        |            | Makes the component RTL                  |



#### Accepted Children

This component accepts children with the following `data-slot` attribute, in order to be displayed in specific places in its layout

| data-slot | description                              | example                                  |
| --------- | ---------------------------------------- | ---------------------------------------- |
| prefix    | Allows you to insert a component (or components) at the start of the input | `<div data-slot="prefix">hello world</div>` |
| suffix    | Allows you to insert a component (or components) at the end of the input | `<div data-slot="suffix">hello world</div>` |



### Code Example

**Example 1:**

```jsx
//TODO: code guys - fix code example!
import * as React from 'react';
import { TimeInput } from './components/TimeInput';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{
    constructor() {
        super();
    }

    render() {
        return <TimeInput
        		 value="{this.state.timeInputValue}"
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
import { TimeInput } from './components/TimeInput';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class ComponentsDemo extends React.Component<{}, {}>{
    constructor() {
        super();
    }

    render() {
        return <TimeInput
        		 value="{this.state.timeInputValue}"
                 onChange={/* something */}>
    				<span data-slot="prefix">icon</span>
        			<button data-slot="suffix">smth</button>
               </TimeInput>;
    }
}
```

*Comments to example 2*



## Style API

### Subcomponents (pseudo-elements)

| selector  | description                            | type                                     |
| :-------- | -------------------------------------- | ---------------------------------------- |
| ::stepper | Allows you to style the stepper arrows | Style the internal `<Stepper/>` component. This component exposes some internal styles. Consult the (Link to Documentation) to see which subcomponents and states are available |



### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :hover, :focus, :disabled, etc | Standard CSS states                      |



### Style Code Example

```css
@import * from './components/timeInput'; /* TODO: fix the correct syntax */
/* style.st.css
Adding rules here (which may be shared between different components) allows us to 	    override specific parts; or even change the whole theme
*/
timeInput {
  background: #bada55;
}

timeInput::stepper {
  background-color: transparent;
}

timeInput::stepper::down, NumberInput::stepper::up {
  color:blue;
}

timeInput::stepper::down:hover, NumberInput::stepper::up:hover {
  background-color:lightblue;
}
```