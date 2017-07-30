# Toggle Component

**Toggle** is a component representing a physical switch that allows users to turn things on or off, like a light switch. Use **Toggle** to present users with two mutually exclusive options (such as on/off, black/white, yes/no), where choosing an option provides immediate results.

## Elements

![elements](./assets/elements.png)

**Toggle** consists of:  **switch**, **icon**, and **background**. The **switch** moves across the **background** in order to set the value to On/Off, and **icon** indicates the state of the value.

## Visual States

| State          | Description                         |
| -------------- | ----------------------------------- |
| On             | Toggle is on / checked              |
| Off            | Toggle is off / unchecked           |
| On + hover     | Toggle is on / checked & hovered    |
| Off + hover    | Toggle is off / unchecked & hovered |
| On + disabled  | Toggle is on & disabled             |
| Off + disabled | Toggle is off & disabled            |

## API

### Component Props

| name        | type                                  | defaultValue | isRequired | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| checked       | bool   | false        |            |                                          |
| onChange      | function   |              |            | Callback function when user changes the value of the component. |
| disabled      | boolean   | false        |            | If `true`, the toggle will not be interactive. |
| label         | string |              |            | Text to display in accessibility mode.    |
| displayIcon   | boolean   | true         | yes        | If `true`, display `iconUnchecked` and `iconChecked`. |
| iconUnchecked | node   | svg          |            | Displays unchecked icon. If node is empty, displays nothing. |
| iconChecked   | node   | svg          |            | Displays checked icon. If node is empty,  displays nothing. |
| RTL           | boolean   | false        |            | Makes the component RTL.                         |

### Code Example

```
//TODO: code guys - fix code example!
import * as React from 'react';
import { Toggle } from './components/toggle';
import style from './style.st.css'; // link to Style file - see examples of style files below

type State = {
  toggleValue: boolean
}

export class ComponentsDemo extends React.Component<{}, State>{
  	state: State,
    
    constructor() {
        super();
    },

    render() {
        return <div>
            <Toggle 
                 onChange={newValue => this.setState({toggleValue: newValue})} // this should conform to the onChange API, please change 
              	 value="{this.state.toggleValue}"
                 />
          </div>;
    }
}
```

## Style API

### Subcomponents (pseudo elements)

| selector   | description                              | type                                     |
| ---------- | ---------------------------------------- | ---------------------------------------- |
| ::switch     | Allows styling the switch of the toggle. | HTML Element - This subcomponent has no subcomponents of its own.* |
| ::background | Allows styling the body of the toggle.   | HTML Element - This subcomponent has no subcomponents of its own.* |

### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :checked                       | Style the toggle element in checked state. |
| :hover, :focus, :disabled, etc | Standard CSS states                       |

### Style Code Example

```
@import * from './components/toggle'; /* TODO: fix the correct syntax */

/* style.st.css 
Adding rules here (which may be shared between different components) allows us to 	    override specific parts; or even change the whole theme
*/

Toggle {
  background-color: transparent;
}

Toggle::background {
  background-color: grey; /* Styles the toggle background. Although the whole look comes from
                             the theme, we override the background color of the slider bar */
}

Toggle::background:checked {
  background-color: blue; /* styles the toggle bg in checked state */
}

Toggle::switch {
  background-color: white; /* styles the switch bg */
}
```
