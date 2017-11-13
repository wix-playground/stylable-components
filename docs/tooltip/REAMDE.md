# Tooltip

Tooltip is a label (usually a text one) that appear on particular event (e.g. hover, focus, touch).

Tooltip identifies element when it is activated. Often used to display brief text description about the anchor element functionality. 


## Elements

![elements](./assets/elements.png)

**Position**

![position](./assets/position.png)

## API

#### Component Props

| name        | type                                     | defaultValue | isRequired | description                              |
| ----------- | ---------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| children    | node                                     | -            | -          | Specifies the element to render inside the tooltip |
| position    | enum: <br>`topLeft`, `top`, `topRight`<br> `bottomLeft`, `bottom`, `bottomRight`<br>`leftTop`, `left`, `leftBottom`<br>`rightTop`, `right`, `rightBottom` | `top`        | -          | Controls the position of the tooltip.    |
| id          | string **(TBD w Yuri)**                  | -            | yes        | The id of element to be used as an anchor for the tooltip (element should have `data-tooltip-for` attribute with the same value). |
| distance    | number (pixels) **(check if it can be replaced w margins)** | -            | -          | Specifies the distance between an anchor & tooltip. |
| showDelay   | number<br>(milliseconds)                 | -            | -          | Specifies a delay in milliseconds for tooltip to appear. |
| hideDelay   | number<br>(milliseconds)                 | -            | -          | Specifies a delay in milliseconds for tooltip to disappear. |
| showTrigger | string | string[]                        | `mouseenter` | -          | Specifies the triggers that shows tooltip.<br>NOTE: supports multiple triggers.<br>[List of triggers](#list_or_triggers). |
| hideTrigger | string | string[]                        | `mouseleave` | -          | Specifies the triggers that hides tooltip.<br>NOTE: supports multiple triggers.<br>[List of triggers](#list_of_triggers). |



**List of triggers**

| Name                                   |
| -------------------------------------- |
| focus                                  |
| blur                                   |
| mouseEnter                             |
| mouseLeave                             |
| click                                  |
| touchstart                             |
| touchleave                             |
| custom **(check if we can do custom)** |



### React Code Example

**Example 1:**

```jsx
import {Tooltip, Button} from 'stylable-components';


class Demo extends React.Component {
    render() {
        return <div>
            <Button data-tooltip-for="any string here">Click for more info</Button>
            <Tooltip id="any string here">I am the Tooltip</Tooltip>
        </div>
    }
}
```

*Comments to example 1*

**Example 2:**

```jsx
import {Tooltip, Button} from 'stylable-components';

class Demo extends React.Component {
    render() {
        return <div>
            <Button data-tooltip-for="any string here">Click for more info</Button>
            <Tooltip
                id="any string here"
                position="bottom"
                openTrigger="click"
                closeTrigger="click,mouseleave"
                children="I am the Tooltip"
            />
        </div>
    }
}
```

*Comments to example 2*

## Style API

#### Subcomponents (pseudo-elements)

| selector | description                              |
| -------- | ---------------------------------------- |
| ::tail   | Style the tail part of the tooltip. <br> E.g. we often hide it with `display: none;` rule. |

#### Custom CSS States (pseudo-classes)

| state                          | description         |
| ------------------------------ | ------------------- |
| :hover, :focus, :disabled, etc | Standard CSS states |

### Style Code Example

```css
Tooltip{
    border: 1px solid limegreen;
    /* border around tooltip */
}
```
