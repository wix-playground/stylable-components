# Radio Group and Radio Button

The **RadioGroup** component is used to group together children and provide them with similar properties. Most common use case is to render **RadioButton** components under the group. 


## Elements

## API

#### Component Props
**RadioGroup** Props:

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------
| name | string |  | no | The name of the group. sets the _name_ property on each child |
| disabled | boolean | false | no | Whether all the radio buttons are disabled |
| readonly | boolean | false | no | Whether the group value cannot be changed |
| onChange | (e: RadioChangeEvent) => void | NOOP | no | Triggered by changing a radio button state |
| dataSource | Array\<RadioButtonProps> | [] | no | Array of dataSchema objects |
| children | React Node | null | no | children


**RadioButton** Props:

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------
| value | string |  | no | The value of the radio button |
| checked | boolean |  | no | Whether the button appears checked |
| name | string |  | no | The name of the group that this button is part of |
| disabled | boolean | false | no | Whether this button appears as disabled |
| readonly | boolean | false | no | Whether this button's value can be changed |
| onChange | (e: RadioChangeEvent) => void | NOOP | no | Triggered by changing the button's state |
| children | React Node | null | no | children | Any further nodes will be rendered. |



### React Code Examples

**Example 1:**

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


**Example 2:**

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

#### **RadioGroup** Subcomponents (pseudo-elements)

| selector | description  | type |
|----------|--------------|------
| ::option | Allows styling the children under the **RadioGroup** | React Node |

#### **RadioButton** Custom CSS States (pseudo-classes)

| state | description |
| ----- | ----------- |
| :disabled | Style the button when it is disabled |
| :focused | Style the component when it gets document focus |
| :checked |  Style the button when it is checked |



### Style Code Example

```css

```
