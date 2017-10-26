## Toggle

A toggle switch is used as an on/off control



### Component API

#### Props

| name     | type                              | defaultValue | isRequired | description                              |
| -------- | --------------------------------- | ------------ | :--------- | ---------------------------------------- |
| value    | bool                              | false        |            |                                          |
| onChange | `(event: {value: boolean}): void` |              |            | Callback function when user changes the value of the component |
| required | bool                              | false        |            | Whether or not filling the value is required in a form. |
| name     | string                            |              |            | The name of the toggle. Behaves like the name attribute of an input element. |
| disabled | bool                              | false        |            | If `true`, the toggle will not be interactive |
| label    | string                            |              |            | Text to display in accessibility mode    |
| error    | bool                              | false        |            | Sets the `:error` CSS state on the `<toggle/>` |

#### Accepted Children

This component has no accepted children.

### Code examples

#### Example 1:

```jsx
import * as React from 'react';
import {Toggle} from './components/toggle';
import style from './style.st.css'; // link to Style file - see examples of style files below

type State = {
  toggleValue: boolean
}

export class ComponentsDemo extends React.Component<{}, State>{
  public state = {
    toggleValue: false
  }

  public render() {
    return <Toggle
      value={this.state.toggleValue}
      onChange={e => this.setState({toggleValue: e.value})}
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

You can add icons to ::switch subcomponent by adding background-image property.

```css
Toggle::switch {
	/* some code */
}
Toggle:checked::switch {
  	/* some code */
}
```
### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :checked                       | Style the toggle element in checked state |
| :rtl                           | Style the component in RTL mode          |
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

Toggle::switch {
    background-image: url('unckecked-icon.svg'); /* adds icon for unchecked state */
}
Toggle:checked::switch {
    background-image: url('ckecked-icon.svg'); /* adds icon for checked state */
}

```



Example 2:**

```
/* code example of the basic theme here? */
```
