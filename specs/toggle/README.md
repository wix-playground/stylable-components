## Toggle Spec

A toggle switch is used as an on/off control



### Component API

#### Props

| name     | type   | defaultValue | isRequired | description                              |
| -------- | ------ | ------------ | :--------- | ---------------------------------------- |
| checked  | bool   | FALSE        |            |                                          |
| onChange | func   |              |            | Callback function when user changes the value of the component |
| required | bool   | FALSE        |            | Whether or not filling the value is required in a form. |
| disabled | bool   | FALSE        |            | If `true`, the toggle will not be interactive |
| label    | string |              |            | Text to display in accessibility mode    |
| error    | bool   | FALSE        |            | Sets the `:error` CSS state on the `<toggle/>` |
| rtl      | bool   | FALSE        |            | Makes the component RTL                  |

#### Accepted Children

This component has no accepted children.

### Code examples

#### Example 1:

```jsx
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
        return <toggle
        		 value="{this.state.toggleValue}"
                 onChange={newValue => this.setState({toggleValue: newValue})}
               />;
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

| selector | description                              | type                                     |
| -------- | ---------------------------------------- | ---------------------------------------- |
| ::switch | Allows to style the switch of the toggle | HTML Element. This subcomponent has no subcomponents of its own* |

**if a subcomponent is a COMPONENT, it might have subcomponents -> then we will link here to its documentation*



### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :checked                       | Style the toggle element in checked state |
| :hover, :focus, :disabled, etc | Standard CSS state                       |



### Style Code Examples

**Example 1:**

```css
@import * from './components/toggle'; /* TODO: fix the correct syntax */
/* style.st.css 
Adding rules here (which may be shared between different components) allows us to 	    override specific parts; or even change the whole theme
*/
Toggle {
  background-color: grey; /* styles the toggle in unchecked state */
}

Toggle:checked {
  background-color: blue; /* styles the togle in checked state */
}

Toggle::switch {
  background-color: white; /* styles the switch bg */
}


```



Example 2:**

```
/* code example of the basic theme here? */
```
