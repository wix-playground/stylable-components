# SelectionList Component

**SelectionList** is a component which allows the user to take action by choosing an item from a list. **SelectionList** will usually be displayed inside of a **Popup** component.

## Elements

![image](./assets/elements.png)

## Component API

> tbd :: add method definition

### Component Props

| name        | type                                  | default | required | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| value | string *or* Array\<string> | null | no | IDs of the selected items. |
| onChange | (value:&nbsp;string)&nbsp;=>&nbsp;void | NOP | no | Triggered when an item is selected in the list. |
| multiple | boolean | false | no | Whether the selection list supports a single or multiple selections. When true, adds `aria-multiselectable='true'` on the root element.
| orientation | enum:<br>'Vertical',<br>'Horizontal' | 'Vertical' | no | The orientation is used mostly for assistive technologies. Changing to 'Horizontal' will change the behavior of keyboard navigation and adds `aria-orientation='Horizontal'` to the root. |
| typeAhead | boolean | false | no | Enables keyboard type-ahead. |
| children | any | null | no | Children to be rendered in the list. |

##### The following props should be placed in an OptionList interface since they will need to be passed from higher order components.

| name        | type                                  | default | required | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| dataSource | SelectionItem[] | [] | no | A few options are accepted as a datasource. |
| dataSchema | object | { id: 'id', displayText:&nbsp;'displayText'&nbsp;} | no | Maps the object properties to the relevant properties required by the ItemRenderer. |
| itemRenderer | Component | default itemRenderer | no | Renders an item in the list. |

> Note: If both datasource and children are present, the children are rendered first and then the dataSource items.

### Code Example

> TBD

## Style API

### Subcomponents (pseudo elements)

selector   | description
--- | ---
item | Selector applying to items in the list.

### Custom CSS States (pseudo-classes)

The following states apply to the items. They are passed as corresponding props of the ItemRenderer and added as an attribute with the prefix `data-`.

state | type | default | description
--- | --- | --- | ---
selected | boolean | false | Whether the item is selected.
focused | boolean | false | Whether the item is focused by keyboard navigation.
hidden | boolean | false | Whether the item appears in the list.
disabled | boolean | false | Whether the item is enabled for selection or not.

The only exception is `hover` which doesn't correspond to an attribute. Rather, it should be styled with the `:hover` CSS pseudoselector.

### Style Code Example

> TBD