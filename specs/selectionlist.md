# SelectionList Component Specification

A component which allows the user to take action by choosing an item from a list. The SelectionList will usually be displayed inside a Popup component.

* [Internal Implementation](#internal-implementation)
* [Properties](#properties)
* [Input Handling](#input-handling)
* [Examples](#examples)

## Internal Implementation

The SelectionList can accept data from the dataSource property or directly as children. When using children, the ItemRenderer is not used and in both cases the elements should be of type SelectionItem.

### ItemRenderer

The default item renderer supports the following properties:

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| enabled | boolean | true | no | Whether an item is enabled for selection or not |
| isOption | boolean | false | no | Whether an item is option title (optgroup). Option items are not selectable or traversable. |

Apart from SelectionItems the default ItemRenderer will accept a symbol to be used as a divider. Note that enabled and isOption define a style for the item.

## Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| onSelect | func | null | no | Triggered when an item is selected in the list |
| children | SelectionItem[] | null | no | Children to be rendered in the list |

* The following props should be placed in an ISelectionList interface since they will need to be passed from higher order components.

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| dataSource | any | null | no | There are a few options accepted as a datasource (see below for explanation) |
| dataScheme | object | { id: 'id', displayText: 'displayText' } | no | Maps the object properties to the relevant properties required by the ItemRenderer |
| itemRenderer | func | default itemRenderer | no | Renders an item in the list |

### Datasource

The datasource property accepts the following:
* string[] | Symbol - The ItemRenderer handles the creation of ListItems from this data type. A symbol should be used to identify a divider item.
* Object[] | Symbol - When using an object array, the dataScheme property should be updated to according to the object.

Note that if children are passed to the component, the dataSource property is ignored.

## Input Handling

Keyboard and mouse navigation have different styling behaviors.

### Keyboard Navigation

* Home -> highlights ths first item in the SelectionList
* End -> highlights the last item in the SelectionList
* Enter -> Selects current highlighted item
* Up arrow -> highlights previous item
* Down arrow -> highlights next item

### Mouse Navigation

* Left-click -> selects an item
* Mouse over -> Gives focus to an item

## Examples

* Create a SelectionList which receives children and renders them
* Create a SelectionList which receives a string array and renders it using the default itemRenderer
* Create a SelectionList which receives an object array and renders it with the dataScheme mapping
* Create a SelectionList which supports onSelect event (via mouse)
* Create a SelectionList which supports keyboard navigation
