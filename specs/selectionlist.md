# SelectionList Component Specification

A component which allows the user to take action by choosing an item from a list. The SelectionList will usually be displayed inside a Popup component.

* [Properties](#properties)
* [Styling](#styling)
* [Input Handling](#input-handling)
* [Internal Implementation](#internal-implementation)
* [Examples](#examples)

## Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| selected | string | no | id of the selected item
| onSelect | (id: string) => void | NOP | no | Triggered when an item is selected in the list |
| children | any | null | no | Children to be rendered in the list |

* The following props should be placed in an OptionList interface since they will need to be passed from higher order components.

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| dataSource | SelectionItem[] | [] | no | There are a few options accepted as a datasource (see below for explanation) |
| dataSchema | object | { id: 'id', displayText: 'displayText' } | no | Maps the object properties to the relevant properties required by the ItemRenderer |
| itemRenderer | Component | default itemRenderer | no | Renders an item in the list |

**Note** that if both datasource and children are present then the children are rendered first and then the dataSource items.

## Styling

You can customize the following internal parts:

* item - selector applying to items in the list

### States
 
The following states apply to the items. The SelectionList adds these states to every rendered item with the appropriate prefix (`data-`).
 
| Name | Type | Default | Description |
| -- | -- | -- | -- |
| selected | boolean | false | Whether the item is selected |
| focused | boolean | false | Whether the item is focused by keyboard navigation |
| hover | boolean | false | Whether the item is hovered by the mouse |
| hidden | boolean | false | Whether ths item appears in the list |
| disabled | boolean | false | Whether an item is enabled for selection or not |

## Input Handling

Keyboard and mouse navigation have different styling behaviors.

### Keyboard Navigation

* Home -> highlights ths first item in the SelectionList
* End -> highlights the last item in the SelectionList
* Enter -> Selects current highlighted item
* Up arrow -> highlights previous item
* Down arrow -> highlights next item

### Mouse

* Left-click -> selects an item
* Mouse over -> Gives mouse hover to an item

## Internal Implementation

### Children

A child in the SelectionList requires a data-value property which will be used for the selected value.

### ItemRenderer

ItemRenderer is a component with the following props:

| Name | Type | Description |
| -- | -- | -- |
| item | SelectionItem | Item to be rendered by the ItemRenderer |
| dataSchema | object | Data schema description

Apart from SelectionItems the default ItemRenderer will accept a Divider symbol (divider) to be used as a divider.
```
const Divider = Symbol();
```

For the default item renderer, just render a string for every item.

### SelectionItem

SelectionItem is a union type of the following

| Type | Description |
| -- | -- |
| Divider | A Symbol representing non-selectable divider
| string | Represents both item value and label
| object | Item is represented as object with schema defined by `dataSchema`

### dataSchema

Data schema creates mapping, which bridges between data structure of `dataSource` and that assumed by the `itemRenderer`.

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| id | string | 'id' | Field containing unique identifier of the item's value
| displayText | string | 'displayText' | Field containing text which is rendered as textual content of the item

If the `'id'` field is missing in the item, it should be displayed but not selectable. (e.g. headings, etc.).


## Examples

* Create a SelectionList which receives children and renders them
* Create a SelectionList which receives a string array and renders it using the default itemRenderer
* Create a SelectionList which receives an object array and renders it with the dataSchema mapping
* Create a SelectionList which supports mouse input handling
* Create a SelectionList which supports keyboard navigation
