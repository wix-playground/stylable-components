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
| selected | string | null | no | id of the selected item |
| onSelect | (id: string) => void | NOP | no | Triggered when an item is selected in the list |
| children | any | null | no | Children to be rendered in the list |
| hidden | string[] | [] | no | List of ids of the items which should be "hidden" (see Style States) |
| disabled | string[] | [] | no | List of ids of the items which should be "disabled" (see Style States) |

* The following props should be placed in an OptionList interface since they will need to be passed from higher order components.

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| dataSource | SelectionItem[] | [] | no | There are a few options accepted as a datasource (see below for explanation) |
| dataSchema | object | { id: 'id', displayText: 'displayText' } | no | Maps the object properties to the relevant properties required by the ItemRenderer |
| itemRenderer | Component | default itemRenderer | no | Renders an item in the list |

**Note** that if both datasource and children are present then the children are rendered first and then the dataSource items.

## ItemRenderer Contract

ItemRenderer is a component with the following props:

| Name | Type | Default value | Description |
| -- | -- | -- | -- |
| item | object or Divider | {} | Remapped SelectionItem to be rendered by the ItemRenderer |
| dataSchema | object | {} | Data schema description
| selected | boolean | false | Whether the item is selected |
| focused | boolean | false | Whether the item is focused by keyboard navigation |
| hover | boolean | false | Whether the item is hovered by the mouse |
| hidden | boolean | false | Whether ths item appears in the list |
| disabled | boolean | false | Whether an item is enabled for selection or not |

ItemRenderer must put `data-value` attribute on the root node of any selectable item. Items without the `data-value`
attribute will be displayed, but won't be selectable.

`item` is an object created by remapping the original SelectionItem using `dataSchema`. Therefore, the
`item` object has always consistent structure, regardless of the structure of the `dataSource.`

If the original SelectionItemn was string, the resulting `item` object will put this value into 
the `id` and `displayText` fields.

## DefaultItemRenderer

If the item doesn't have the `id` field, it is rendered without the `data-value`.

If the item is the Divider symbol, it will be renderer as a divider. (!)

### Styling

You can customize the following internal parts:

* item - selector applying to items in the list

### Style States
 
The following states apply to the items. They are passed as corresponding props of the ItemRenderer
and added as an attribute with the appropriate prefix (`data-`).
 
| Name | Type | Default | Description |
| -- | -- | -- | -- |
| selected | boolean | false | Whether the item is selected |
| focused | boolean | false | Whether the item is focused by keyboard navigation |
| hidden | boolean | false | Whether ths item appears in the list |
| disabled | boolean | false | Whether an item is enabled for selection or not |

The only exception is `hover` which doesn't correspond to an attribute. Rather, it should be staled with
the `:hover` CSS pseudoselector.

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

All the children, whether passed as `props.children` or rendered from `dataSource` conform the same rules.
For a child to be selectable, it must have `data-value` attribute with corresponding unique id for the item.
The rest (style state handling, etc.) is item renderer-specific.

### Event Handling

SelectionInput doesn't add mouse event handlers on every item. Rather, it listens to their common parent
and distinguishes the items by their `data-value` attribute.


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
