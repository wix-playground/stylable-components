# SelectionList Component Specification

A component which allows the user to take action by choosing an item from a list. The SelectionList will usually be displayed inside a Popup component.

Any children passed to the SelectionList or created by the

* [Internal Implementation](#internal-implementation)
* [Properties](#properties)
* [Input Handling](#input-handling)
* [Examples](#examples)

## Internal Implementation

### ItemRenderer

The default item renderer supports the following properties:

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| enabled | boolean | true | no | Whether an item is enabled for selection or not |
| isOption | boolean | false | no | Whether an item is option title (optgroup). Option items are not selectable or traversable. |

## Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| onSelect | func | null | no | Triggered when an item is selected in the list |
| children | ListItem[] | null | no | Children to be rendered in the list |

* The following props should be placed in an ISelectionList interface since they will need to be passed from higher order components.

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| dataSource | any | null | no | There are a few options accepted as a datasource (see below for explanation) |
| dataScheme | object | { id: 'id', displayText: 'displayText' } | no | Maps the object properties to the relevant properties required by the ItemRenderer |
| itemRenderer | func | default itemRenderer | no | Renders an item in the list |

### Datasource

The datasource property accepts the following:
* string[] - An array of strings. The ItemRenderer handles the creation of ListItems from this data type.
* Object[] - An array of objects. When using an object array, the dataScheme property should be updated to according to the object. The  ItemRenderer handles the creation of ListItems from this data type.

Note that if children are passed to the component, the dataSource property is ignored.

