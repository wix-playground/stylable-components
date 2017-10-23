# Tooltip

Tooltip is a label (usually a text one) that appear when the user hovers over, focuses on, or touches an element.

Tooltips identify an element when they are activated. Usually used to display brief text description about its functionality. 

Tooltip is shown on:

1. Hover
2. Focus
3. Touch



## Elements

![elements](/Users/maximc/code/stylable-components/docs/tooltip/assets/elements.png)

## API

#### Component Props

| name        | type                                     | defaultValue | isRequired | description                              |
| ----------- | ---------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| children    | node                                     | -            | -          | Specifies the element to render inside the tooltip |
| position    | enum: <br>`top`<br>`bottom`<br>`left`<br>`right` | `top`        | yes        | Controls the position of the tooltip. <br> Supports the following options: `top`, `bottom`, `left`, `right`. |
| anchor      | element                                  | -            | yes        | The element to be used as an anchor for the tooltip (element will open next to it). |
| distance    | number<br>(pixels)                       | -            | -          | Specifies the distance between an anchor & tooltip. |
| showDelay   | number<br>(milliseconds)                 | -            | -          | Specifies a delay in milliseconds for tooltip to appear. |
| hideDelay   | number<br>(milliseconds)                 | -            | -          | Specifies a delay in milliseconds for tooltip to disappear. |
| showTrigger | string                                   | `mouseenter` | yes        | Specifies the trigger that shows tooltip.<br>NOTE: supports multiple triggers.<br>[List of triggers](#list_or_triggers). |
| hideTrigger | string                                   | `mouseleave` | yes        | Specifies the trigger that hides tooltip.<br>NOTE: supports multiple triggers.<br>[List of triggers](#list_of_triggers). |



**List of triggers**

| Name       | Event                           |
| ---------- | ------------------------------- |
| focus      | onFocus                         |
| blur       | onBlur                          |
| mouseEnter | onMouseEnter                    |
| mouseLeave | onMouseLeave                    |
| click      | onClick                         |
| custom     | Allows to create custom trigger |



### React Code Example

**Example 1:**

```
some comment
```

*Comments to example 1*

**Example 2:**

```
some comment
```

*Comments to example 2*

## Style API

#### Subcomponents (pseudo-elements)

| selector      | description                              |
| ------------- | ---------------------------------------- |
| ::tabList     | Allows to style container that stores all tabs |
| ::selectedTab | Allows to style selected tab             |
| ::tabPanel    | Allows to style tab panel                |

#### Custom CSS States (pseudo-classes)

| state                          | description         |
| ------------------------------ | ------------------- |
| :hover, :focus, :disabled, etc | Standard CSS states |

### Style Code Example (TBD!!!)

```css
Tooltip{
    border: 1px solid limegreen;
    /* border around tooltip */
}
```