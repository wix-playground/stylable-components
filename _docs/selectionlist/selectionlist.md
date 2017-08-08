# SelectionList Component

**SelectionList** is a component which allows the user to take action by choosing an item from a list. **SelectionList** will usually be displayed inside of a **Popup** component.

## Elements


## Component API

> tbd :: add method definition

### Component Props

| name        | type                                  | default | isRequired | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| value | string | null | no | id of the selected item. |
| onChange | (value: string) => void | NOP | no | Triggered when an item is selected in the list. |
| children | any | null | no | Children to be rendered in the list. |

##### The following props should be placed in an OptionList interface since they will need to be passed from higher order components.

| name        | type                                  | default | isRequired | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| dataSource | SelectionItem[] | [] | no | There are a few options accepted as a datasource (see below for explanation). |
| dataSchema | object | { id: 'id', displayText:&nbsp;'displayText'&nbsp;} | no | Maps the object properties to the relevant properties required by the ItemRenderer. |
| itemRenderer | Component | default itemRenderer | no | Renders an item in the list. |

> Note: if both datasource and children are present then the children are rendered first and then the dataSource items.

#### Selection Items

All of the selection items `SelectionItem`, whether passed as `props.children` or rendered from `dataSource`, conform to the same rules. For a `SelectionItem` to be selectable, it must have the `data-value` attribute with a corresponding unique id for the item. The rest (style state handling, etc.) is item renderer-specific.

#### `onChange` Event Handling

`SelectionInput` doesn't add mouse event handlers on every item. Rather, it listens to their common parent and distinguishes the items by their `data-value` attribute.

#### SelectionItem

`SelectionItem` is a union type of the following

type | description |
--- | --- |
divider | An object (defined in the components library) representing a non-selectable divider.<br> A reference to this object as a SelectionItem is rendered as a divider. 
string | Represents both item value and label.
object | Item is represented as object with schema defined by `dataSchema`.

#### dataSchema

Data schema creates mapping, which bridges between data structure of `dataSource` and that assumed by the `itemRenderer`. That is, it is `itemRenderer` and `dataSource` specific.

name | type | default | required | description
--- | --- | --- | --- | ---
value | string | id | no | Field containing unique identifier of the item's value.
displayText | string | displayText | no | Field containing text which is rendered as textual content of the item.

If the `'id'` field is missing in the item, it should be displayed but not selectable. (e.g. headings, etc.).

#### ItemRenderer

ItemRenderer is a component with the following props:

| name | type | default | description |
| --- | --- | --- | --- |
| item | object or<br> divider | {} | Remapped `SelectionItem` to be rendered by the `ItemRenderer`. |
| selected | boolean | false | Whether the item is selected. |
| focused | boolean | false  | Whether the item is focused by keyboard navigation. |

`ItemRenderer` must put `data-value` attribute on the root node of any selectable item. Items without the `data-value` attribute will be displayed, but won't be selectable.

`item` is an object created by remapping the original `SelectionItem` using `dataSchema`. Therefore, the `item` object always has a consistent structure, regardless of the structure of the `dataSource.`

If the original `SelectionItem` was string, the resulting `item` object will put this value into the `value` and `displayText` fields.

##### Default ItemRenderer

If the item doesn't have the `value` field, it is rendered without the `data-value`.

If the item is the **divider object**, it will be rendered as a non-selectable divider in the list.

In the default `ItemRenderer`, the (mapped) item object has the following structure:

name | type | default | required | description
--- | --- | --- | --- | ---
value | string | null | no | The unique value id (for selectable items).
displayText | string | '' | no | Text content of the item.
hidden | boolean | false | no | Whether ths item appears in the list.
disabled | boolean | false | no | Whether an item is enabled for selection or not.

### Input Handling

Keyboard and mouse navigation have different styling behaviors.

#### Keyboard Navigation

key | action
--- | ---
Home | Highlights ths first item in the SelectionList.
End | Highlights the last item in the SelectionList.
Enter | Selects current highlighted item.
Up arrow | Highlights previous item.
Down arrow | Highlights next item.

Non-selectable items (items without `data-value` on the root element) are skipped during the keyboard traversal.

#### Mouse

event | action
--- | ---
Left-click | Selects an item.
Mouse over | Gives mouse hover to an item.

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

### Style Code Example

> TBD