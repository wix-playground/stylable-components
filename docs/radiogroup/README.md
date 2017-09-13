# Radio Group and Radio Button

The **RadioGroup** component is used to group together children and provide them with similar properties. The most common use case is to render **RadioButton** components in a **RadioGroup**. 

## API

### RadioGroup Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------
| name | string | none | no | The name of the group. Sets the _name_ property on each child. |
| disabled | boolean | false | no | Whether all the radio buttons are disabled. |
| readOnly | boolean | false | no | Whether the group value cannot be changed. |
| labelLocation | 'right' or 'left' | 'right' | no | Whether each child's value appears as text to the right or left of the radio button.  |
| onChange | function | NOOP | no | `(e: RadioChangeEvent) => void`<br>Triggered by changing a radio button state. |
| dataSource | Array\<RadioButtonProps> | [] | no | Array of dataSchema objects. |

### RadioButton Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------
| value | string |  | no | The value of the radio button. |
| checked | boolean |  | no | Whether the button appears checked. |
| name | string |  | no | The name of the group that this button is part of. |
| disabled | boolean | false | no | Whether this button appears as disabled. |
| readOnly | boolean | false | no | Whether this button's value can be changed. |
| labelLocation | 'right' or 'left' | 'right' | no | Whether the text supplied in the value property appears to the right or left of the button itself.  |
| onChange | function | NOOP | no | `(e: RadioChangeEvent) => void`<br>Triggered by changing the button's state. |


### Code Examples

**Example 1**

```jsx
import * as React from 'react';
import { RadioGroup, RadioButton } from 'stylable-components';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class Example1 extends React.Component<{}, {}>{
    public state = {
      myValue: '',
    };

    private onChange = (e: {value: string}) => {
        this.setState({myValue: e.value});
    }
    
    render() {
        return (
            <RadioGroup onChange={this.onChange} name="example1" className="rg1">
               <RadioButton value="Option 1"/>
               <RadioButton value="Option 2" checked/>
               <RadioButton value="Option 3"/>
           </RadioGroup>
       );
    }
}
```


**Example 2**

```jsx
import * as React from 'react';
import { RadioGroup, RadioButton, RadioChangeEvent } from 'stylable-components';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class Example2 extends React.Component<{}, {}>{
    public state = {
      myValue: '',
    };

    private onChange = (e: {value: string}) => {
        this.setState({myValue: e.value});
    }
    
    render() {
        return (
            <RadioGroup
                 onChange={this.onChange}
                 labelLocation="left"
                 name="example2"
                 className="rg2"
                 dataSource={[
                     {value: 'Option 1'},
                     {value: 'Option 2', checked: true},
                     {value: 'Option 3'}
                 ]}
            />
       );
    }
}
```

## Style API

### RadioGroup Subcomponents (pseudo-elements)

| Selector | Description  |
|----------|--------------|
| ::radioGroupChild | Allows styling the children under the *RadioGroup* |

### RadioButton Custom CSS States (pseudo-classes)

| State | Description |
| ----- | ----------- |
| :disabled | Style the button when it is disabled. |
| :focused | Style the component when it gets document focus. |
| :checked |  Style the button when it is checked. |
| :isLeftLabel | Style the component when the label is on the left side (by default label is on the right). |

### Style Code Example

```css
:import {
    -st-from: "../../src/components/radio-group/radio-group.st.css";
    -st-default: RG;
}

.rg {
    -st-extends: RG;
}

.rg::radioGroupChild {
    display: block;
}
```
