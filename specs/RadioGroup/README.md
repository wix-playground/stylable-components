# Radio Group and Radio Button

The **RadioGroup** component is used to group together children and provide them with similar properties. Most common use case is to render **RadioButton** components under the group. 


## Elements
???

## API

#### Component Props
**RadioGroup** Props:

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------
| name | string |  | no | The name of the group. sets the _name_ property on each child |
| disabled | boolean | false | no | Whether all the radio buttons are disabled |
| readonly | boolean | false | no | Whether the group value cannot be changed |
| labelLocation | 'right' or 'left' | 'right' | no | Whether each child's value appears as text to the right or left of the radio button  |
| onChange | (e: RadioChangeEvent) => void | NOOP | no | Triggered by changing a radio button state |
| dataSource | Array\<RadioButtonProps> | [] | no | Array of dataSchema objects |

**RadioButton** Props:

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------
| value | string |  | no | The value of the radio button |
| checked | boolean |  | no | Whether the button appears checked |
| name | string |  | no | The name of the group that this button is part of |
| disabled | boolean | false | no | Whether this button appears as disabled |
| readonly | boolean | false | no | Whether this button's value can be changed |
| labelLocation | 'right' or 'left' | 'right' | no | Whether the text supplied in the value property appears to the right or left of the button itself  |
| onChange | (e: RadioChangeEvent) => void | NOOP | no | Triggered by changing the button's state |




#### Accepted Children

The **RadioGroup** component will render children in one of two forms:
1. As React JSX (see example 1)
2. As data source - an array of objects adhering to the data schema (see example 2) 



### React Code Example

**Example 1:**

```jsx
import * as React from 'react';
import { RadioGroup, RadioButton, RadioChangeEvent } from 'stylable-components';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class Example1 extends React.Component<{}, {}>{
    public state = {
      myValue: '',
    };

    private onChange = (e: RadioChangeEvent) => {
        this.setState({myValue: e.value});
    }
    
    render() {
        return (
            <RadioGroup onChange={this.onChange} name="example1" className="rg1">
               <RadioButton value="I am a radio button!"/>
               <RadioButton value="I am as well!"/>
               <RadioButton value="Me too, but disabled" disabled/>
               <RadioButton value="I am both disabled and checked" checked disabled />
           </RadioGroup>
       );
    }
}
```


**Example 2:**

```jsx
import * as React from 'react';
import { RadioGroup, RadioButton, RadioChangeEvent } from 'stylable-components';
import style from './style.st.css'; // link to Style file - see examples of style files below

export class Example2 extends React.Component<{}, {}>{
    public state = {
      myValue: '',
    };

    private onChange = (e: RadioChangeEvent) => {
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
                     {value: 'Default'},
                     {value: 'Checked', checked: true},
                     {value: 'Disabled', disabled: true}
                 ]}
            />
       );
    }
}
```



## Style API

#### **RadioGroup** Subcomponents (pseudo-elements)

| selector | description  | type | children pseudo-states |
|----------|--------------|------|------------------------|
| ::radioGroupChild | Allows styling the children under the **RadioGroup** | **RadioButton** | :error - allows styling the error state of the internal switch |

#### **RadioButton** Custom CSS States (pseudo-classes)

| state | description |
| ----- | ----------- |
| :disabled | Style the button when it is disabled |
| :focused | Style the component when it gets document focus |
| :checked |  Style the button when it is checked |
| :isLeftLabel | Style the component when the label is the left side (by default label is on the right) |



### Style Code Example

```css

```
