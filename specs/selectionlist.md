# SelectionList Component Specification

A component which allows the user to take action by choosing an item from a list. The SelectionList will usually be displayed inside a Popup component.

* [Internal Implementation](#internal-implementation)
* [Properties](#properties)
* [Input Handling](#input-handling)
* [Examples](#examples)

## Internal Implementation

The SelectionList can accept data from the dataSource property or directly as children. When using children and a datasource, the children will be rendered before the items from the datasource (for headers for example)
In all cases only SelectionItems are part of the elements that react to the onSelect and traversal events.


### ItemRenderer

The default item renderer supports the following properties:

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |

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

### Styling

#### internal parts:

you can customize the following internal parts:

* item - selector applying to items in the list

#### states:
  
 the following states apply to the top level:
 
 | Name | Type | Default |  Description |
| -- | -- | -- | -- |
| selected | boolean | false | Whether the ANY item is selected |
| focused | boolean | false | no | Whether ANY item is focused by keyboard navigation |
| hover | boolean | false | no | Whether the list is hovered by the mouse |
| disabled | boolean | false | no | Whether the list is disabled for selection or not |
 

 the following states apply to the item selector:
 
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

### Mouse Navigation

* Left-click -> selects an item
* Mouse over -> Gives focus to an item




## Examples

* Create a SelectionList which receives children and renders them
* Create a SelectionList which receives a string array and renders it using the default itemRenderer
* Create a SelectionList which receives an object array and renders it with the dataScheme mapping
* Create a SelectionList which supports onSelect event (via mouse)
* Create a SelectionList which supports keyboard navigation
