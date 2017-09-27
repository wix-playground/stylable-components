# SelectionList Component Specification

A component which allows the user to take action by choosing an item from a list. The SelectionList will usually be displayed inside a Popup component.

* [Properties](#properties)
* [ItemRenderer Contract](#itemrenderer-contract)
* [Default ItemRenderer](#default-itemrenderer)
* [Accessibility](#accessibility)
* [Input Handling](#input-handling)
* [Internal Implementation](#internal-implementation)
* [Examples](#examples)

## Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| value | string \| Array\<string> | null | no | id/s of the selected item/s |
| onChange | (event: ChangeEvent<string>) => void | NOP | no | Triggered when an item is selected in the list |
| multiple | boolean | false | no | Whether the selection list supports a single or multiple selections. When true, adds the aria-multiselectable='true' on the root element.
| orientation | enum | Vertical | no | The orientation is used mostly for assistive technologies. Changing to Horizontal will change the behavior of keyboard navigation and add an aria-orientation attribute to the root with the 'horizontal' value |
| typeAhead | boolean | true | no | Enables keyboard type-ahead |
| children | any | null | no | Children to be rendered in the list |

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
| selected | boolean | false | Whether the item is selected |
| focused | boolean | false  | Whether the item is focused by keyboard navigation |


ItemRenderer must put `data-value` attribute on the root node of any selectable item. Items without the `data-value`
attribute will be displayed, but won't be selectable.

`item` is an object created by remapping the original SelectionItem using `dataSchema`. Therefore, the
`item` object has always consistent structure, regardless of the structure of the `dataSource.`

If the original SelectionItemn was string, the resulting `item` object will put this value into
the `value` and `displayText` fields.

## Default ItemRenderer

If the item doesn't have the `value` field, it is rendered without the `data-value`.

If the item is the Divider symbol, it will be renderer as a divider. (!)

In the default ItemRenderer, the (remapped) item object has following structure:

| Name | Type | Default value | Required | Description |
| -- | -- | -- | -- | -- |
| id | string | automatically generated | no | Used in order to provide a key for assistive technologies to locate the focused option |
| value | string | null | no | The unique value id (for selectable items) |
| displayText | string | '' | no | Text content of the item |
| hidden | boolean | false | no | Whether ths item appears in the list |
| disabled | boolean | false | no | Whether an item is enabled for selection or not |

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

## Accessibility

Reference [listbox](https://www.w3.org/TR/wai-aria-practices/#Listbox) in w3 draft.

### Roles
* Root Role - listbox (identifies the focusable element that has listbox behaviors and contains listbox options)
* Children role - option (identifies a selectable element)

### Aria
* aria-selected="true" - Applied to elements with role option that are visually styled as selected to inform assistive technologies that the options are selected. When multiple selections are allowed, this attribute is applied to all selected items (false when not selected).

### Focus

Focus handled by the parent component.

## Input Handling

Keyboard and mouse navigation have different styling behaviors.

### Keyboard Navigation

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Home</kbd> -> highlights ths first item in the SelectionList
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">End</kbd> -> highlights the last item in the SelectionList
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Up</kbd> -> highlights previous item
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Down</kbd> -> highlights next item
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Space</kbd> -> Toggles the selected state of the focused option (multi-select) or selects the option (single select)
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Enter</kbd> -> Toggles the selected state of the focused option. Do not prevent default, since the enter key is needed in parent components.
* Type-ahead, when enabled relevant for all character and number keys (ASCII ordering):

  * Upon input, focus moves to the next item with a name that starts with the typed character.
  * Upon multiple input in rapid succession(wait 300ms after last input before moving focus?), focus moves to the next item that starts with the characters typed.

  Let's discuss what we need to implement this in a generic fashion.

Non-selectable items (items without `data-value` on the root element) are skipped during the keyboard traversal.

### Mouse

* Left-click -> selects an item
* Mouse over -> Gives mouse hover to an item

## Internal Implementation

### Children

All the children, whether passed as `props.children` or rendered from `dataSource` conform to the same rules.
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
(i.e. it is itemRenderer and dataSource specific)

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| value | string | 'id' | Field containing unique identifier of the item's value
| displayText | string | 'displayText' | Field containing text which is rendered as textual content of the item

If the `'id'` field is missing in the item, it should be displayed but not selectable. (e.g. headings, etc.).


## Examples

* Create a SelectionList which receives children and renders them
* Create a SelectionList which receives a string array and renders it using the default itemRenderer
* Create a SelectionList which receives an object array and renders it with the dataSchema mapping
* Create a SelectionList which supports mouse input handling
* Create a SelectionList which supports keyboard navigation
