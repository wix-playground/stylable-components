# SelectionList Component Specification

A component which allows the user to take action by choosing an item from a list. The SelectionList will usually be displayed inside a Popup component.

* [Elements](#elements)
* [API](#api)
* [RenderItem Contract](#renderitem-contract)
* [Default RenderItem](#default-renderitem)
* [Accessibility](#accessibility)
  * [Roles](#roles)
  * [Aria Attributes](#aria-attributes)
  * [Focus](#focus)
* [Behavior](#behavior)
  * [Keyboard](#keyboard)
  * [Mouse](#mouse)
  * [Touch](#touch)
* [Internal Implementation](#internal-implementation)

## Elements

![image](./assets/selectionlistelements.png)

## API

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| value | string | null | no | id/s of the selected item/s |
| onChange | (event: ChangeEvent) => void | NOP | no | Triggered when an item is selected in the list |
| multiple | boolean | false | no | Not Supported. Whether the selection list supports a single or multiple selections. When true, adds the aria-multiselectable='true' on the root element.
| orientation | enum | Vertical | no | The orientation is used mostly for assistive technologies. Changing to Horizontal will change the behavior of keyboard navigation and add an aria-orientation attribute to the root with the 'horizontal' value |
| typeAhead | boolean | true | no | Enables keyboard type-ahead |
| children | any | null | no | Children to be rendered in the list |
| disabled | boolean | false | no | Whether the SelectionList responds to events or not |
| readonly | boolean | false | no | Gains tab focus but user cannot change value |
| id | string | null | no | Unique identifier, relevant for a standalone component |
| name | string | null | no | Specifies the name of the input element, relevant for a standalone component |
| tabIndex | number | null | no | Tab order of the element, relevant for a standalone component |
| aria-label | string | null | no | aria attribute, relevant for a standalone component |
| aria-labelledby | string | null | no | aria attribute, relevant for a standalone component |
| aria-describedby | string | null | no | aria attribute, relevant for a standalone component |

* The following props should be placed in an OptionList interface since they will need to be passed from higher order components.

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| dataSource | Array[DataSourceItem] | [] | no | The DataSourceItem is of type '*string \| object \| symbol*'. The dataSource receives an array and the component uses the renderItem function to render the items in the array in order.
| dataMapper | (item) -> ({value, string, disabled}) | {} | no | Maps fields from the DataSourceItem to the field used by the renderItem function |
| renderItem | See RenderItem contract | null | default function | no | The renderItem function receives a DataSourceItem and then decides how to render it.

**Note** for the default SelectionList renderItem function that if both datasource and children are present then the children are rendered first and then the dataSource items.

## RenderItem Contract

RenderItem is a function with the following arguments:

| Name | Type | Default value | Description |
| -- | -- | -- | -- |
| item | object or Divider | {} | Remapped SelectionItem to be rendered by the ItemRenderer |
| selected | boolean | false | Whether the item is selected |
| focused | boolean | false  | Whether the item is focused by keyboard navigation |


RenderItem must put `data-value` attribute on the root node of any selectable item. Items without the `data-value`
attribute will be displayed, but won't be selectable.

`item` is an object created by remapping the original SelectionItem using `dataMapper`. Therefore, the
`item` object has always consistent structure, regardless of the structure of the `dataSource.`

If the original SelectionItemn was string, the resulting `item` object will put this value into
the `value` and `displayText` fields.

## Default RenderItem

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

The following states apply to the items. They are passed as corresponding props of the ItemRenderer.

| Name | Type | Default | Description |
| -- | -- | -- | -- |
| selected | boolean | false | Whether the item is selected |
| focused | boolean | false | Whether the item is focused by keyboard navigation |
| hidden | boolean | false | Whether ths item appears in the list |
| disabled | boolean | false | Whether an item is enabled for selection or not |

Appart from the items the component's root i.e. the list itself has states as follows.

| Name | Type | Default| Description |
| -- | -- | -- | -- |
| hasSelection| boolean | false | Wheter an item in the list is selected |
|focused | boolean | false | whther the root is focused |
| disabled | boolean | false | Wheter the list has been diabled

The only exception is `hover` which doesn't correspond to an attribute. Rather, it should be staled with
the `:hover` CSS pseudoselector.

## Accessibility

Reference [listbox](https://www.w3.org/TR/wai-aria-practices/#Listbox) in w3 draft.

### Roles
* Root Role - listbox (identifies the focusable element that has listbox behaviors and contains listbox options)
* Children role - option (identifies a selectable element)

### Aria Attributes
* aria-selected="true" - Applied to elements with role option that are visually styled as selected to inform assistive technologies that the options are selected. When multiple selections are allowed, this attribute is applied to all selected items (false when not selected).
* aria-orientation="vertical" - Applied on the root element. By default the value should be vertical, so only if the orientation is set horizontal should the value change to "horizontal".

### Focus

Focus handled by the parent component.

## Behavior

Keyboard and mouse navigation have different styling behaviors.

### Keyboard

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

### Touch

* Tapping on an item selects it.

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
| Divider | A Symbol representing non-selectable divider |
| string | Represents both item value and label |
| object | Item is represented as object with schema defined by `dataMapper` |

### dataMapper

Data mapper provides information regarding dadtaSource items and specifically their value and label. 

| Name | Type | Default | Description |
| ---| --- | --- | --- | --- |
| value | Any | no | Field containing the item's value or its identifier.
| label | string | "" | Field contating text ual represntation of the item.
| disabled | boolean | false | Marks item as unselectable

In case where there is item should be ignored (for example when it is a divider) dataMapper should return no.

