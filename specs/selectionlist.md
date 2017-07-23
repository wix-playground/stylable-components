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
| onSelect | func | null | no | Triggered when an item is selected in the list |
| children | SelectionItem[] | null | no | Children to be rendered in the list |

* The following props should be placed in an OptionList interface since they will need to be passed from higher order components.

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| dataSource | any | null | no | There are a few options accepted as a datasource (see below for explanation) |
| dataScheme | object | { id: 'id', displayText: 'displayText' } | no | Maps the object properties to the relevant properties required by the ItemRenderer |
| itemRenderer | func | default itemRenderer | no | Renders an item in the list |

**Note** that if both datasource and children are present then the children are rendered first and then the dataSource items.

### Datasource

The datasource property accepts the following:
* Array<string | Symbol> - The ItemRenderer handles the creation of ListItems from this data type. A symbol should be used to identify a divider item.
* Array<object | Symbol> - When using an object array, the dataScheme property should be updated to according to the object.

## Styling

You can customize the following internal parts:

* item - selector applying to items in the list

### States
  
The following states apply to the top level:
 
| Name | Type | Description |
| -- | -- | -- |
| selected | boolean | Whether the any item is selected |
| focused | boolean | Whether any item is focused by keyboard navigation |
| hover | boolean | Whether the list is hovered by the mouse |
| disabled | boolean | Whether the list is disabled for selection or not |
 
The following states apply to the item selector:
 
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

### ItemRenderer

The default item renderer supports the following properties:

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| isOptGroup | boolean | false | no | Whether an item is option title (optgroup). Option items are not selectable or traversable. |

Apart from SelectionItems the default ItemRenderer will accept a Divider symbol (divider) to be used as a divider.
```
const Divider = Symbol();
```

For the default item renderer, just render a string for every item.

## Examples

* Create a SelectionList which receives children and renders them
* Create a SelectionList which receives a string array and renders it using the default itemRenderer
* Create a SelectionList which receives an object array and renders it with the dataScheme mapping
* Create a SelectionList which supports mouse input handling
* Create a SelectionList which supports keyboard navigation
