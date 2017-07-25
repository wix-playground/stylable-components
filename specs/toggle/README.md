## Toggle Spec

A toggle switch is used as an on/off control



### Component API

#### Props

| name          | type   | defaultValue | isRequired | description                              |
| ------------- | ------ | ------------ | :--------- | ---------------------------------------- |
| checked       | bool   | false        |            |                                          |
| onChange      | func   |              |            | Callback function when user changes the value of the component |
| disabled      | bool   | false        |            | If `true`, the toggle will not be interactive |
| label         | string |              |            | Text to display in accessibility mode    |
| displayIcon   | bool   | true         | yes        | If `true` display `iconUnchecked` & `iconChecked` |
| iconUnchecked | node   | svg          |            | Displays unchecked icon. If node is empty  displays nothing. |
| iconChecked   | node   | svg          |            | Displays checked icon. If node is empty  displays nothing. |
| RTL           | bool   | FALSE        |            | NEED TO RESEARCH                         |



### Code examples

#### Example 1:

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

comments to example 1

#### Example 2:

```
//...example 2: give something interesting
```

comments to example 2



## Style API

### Subcomponents (pseudo-elements)

| selector     | description                              | type                                     |
| ------------ | ---------------------------------------- | ---------------------------------------- |
| ::switch     | Allows to style the switch of the toggle | HTML Element. This subcomponent has no subcomponents of its own* |
| ::background | Allows to style the body of the toggle   | HTML Element. This subcomponent has no subcomponents of its own* |

**if a subcomponent is a COMPONENT, it might have subcomponents -> then we will link here to its documentation*



### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :checked                       | Style the toggle element in checked state |
| :hover, :focus, :disabled, etc | Standard CSS state                       |



### Style Code Examples

**Example 1:**

```
@import * from './components/toggle'; /* TODO: fix the correct syntax */
/* style.st.css 
Adding rules here (which may be shared between different components) allows us to 	    override specific parts; or even change the whole theme
*/
Toggle {
  background-color: transparent;
}

Toggle::background {
  background-color: grey; /* styles the toggle bg. Although the whole look comes from the 							theme, we override the background color of the slider bar */
}

Toggle::background:checked {
  background-color: blue; /* styles the toggle bg in checked state */
}

Toggle::switch {
  background-color: white; /* styles the switch bg */
}
```



Example 2:**

```
/* code example of the basic theme here? */
```
