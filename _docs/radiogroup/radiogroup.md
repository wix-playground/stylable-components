# RadioGroup Component

**RadioGroup** is a component designed to be similar to native radiogroup implementations.

## Elements

> TBD
> 

## Component API

### Component Props

| name        | type                                  | default | required | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| value |  | false | no | The value chosen in the checkbox. |
| onChange |  | NOOP | no | Triggered by changing a radio button state. |
| children | Array\<Node> | null | no | children | Radio buttons and/or other nodes which will be rendered. |
| dataSource | Array\<Object> | [] | no | There are a few options accepted as a datasource. |
| dataSchema | object | {&nbsp;id:&nbsp;'id', displayText:&nbsp;'displayText'&nbsp;} | no | Maps the object properties to the relevant properties required by the ItemRenderer. |
| itemRenderer | Component | default itemRenderer | no | Renders a Radio Button per item in the list. |
| disabled | boolean | false | no | Whether all the radio buttons are disabled. |
| readonly | boolean | false | no | Whether the group value cannot be changed. |
| ariaLabel | string | null | no | aria attribute |
| ariaLabelledBy | string | null | no | aria attribute |
| ariaDescribedBy | string | null | no | aria attribute |

### Code Example

> TBD
