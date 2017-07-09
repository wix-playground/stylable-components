# TreeView Component Specification

A typed React TreeView component.

## Internal



## Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| dataSource | TreeItems[] | null | Yes | An array of TreeItems |
| selectedItem | TreeItem | null | No | The selected TreeItem, by default none is selected |
| itemRenderer | func | default function | No | Overrides the default function for rendering nodes |
| dragAndDrop | boolean | false | No | When enabled user can drag and drop nodes in the tree. Nodes are moved with their children |
| keyboardNavigation | boolean | true | No | When enabled, user can traverse the tree using keyboard arrow keys |
| loadOnDemand | boolean | false | No | Whether parent nodes are populated with children before they are expanded. If the children are null(??) then we know that there are no more children to load for a node. |
| loadMethod | func | null | no | The method used to load the children of a node |
| searchMethod | func | default function | No | The default function searches according to the node title with exact prefix matching.|


## Methods

| Name | Parameters | Description |
| -- | -- | -- |
| collapse | item: TreeItem (required) | Collapses item |
| collapsePath | item: TreeItem (required) | Collapses all nodes under a provided node |
| collapseTree | none | Collapses all the tree nodes |
| expand | item: TreeItem (required) | Expands item |
| expandPath | item: TreeItem (required) | Expands all nodes under a provided node |
| expandTree | none | Expands all the tree nodes |
| findItem | searchQuery: string or any | Executes the searchMethod with the searchQuery |
| selectItem | item: TreeItem (required) | Selects an item in the three |


## Events

| Name | Description |
| -- | -- |
| onSelect | Triggered when a selection has been changed |
| onExpand | Triggered when a node is expanded |
| onCollapse | Triggered when a node is collapsed |
| onDragStart | Triggered before a dragging of a node starts |
| onDrag | Triggered while a node is being dragged |
| onDragEnd | Triggered after a node had been dragged |
| onDrop | Triggered when a node is dropped |

## Input Handling

### Keyboard Navigation

* Home -> highlights ths first item in the TreeView
* End -> highlights the last item in the TreeView
* Enter -> Selects current highlighted item (does not expand it though)
* Up arrow -> highlights previous item
* Down arrow -> highlights next item
* Left arrow ->
  * if child then highlights parent
  * if parent then collapses it
* Right arrow ->
  * expands item and highlights it
  * if item was already expanded then highlights the first child

### Mouse/Touch Events

Important to use preventDefault inside touch event handlers to verify that mouse and touch are not both triggered when functions are available for both.

*

## TreeItem Interface

### Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| expanded | boolean (not observable) | false | No | Shows child nodes if true or hides them if false |
| selected | boolean (not observable) | false | No | Node is selected or not |
| enabled | boolean | true | No | Enables or disables a node. A disabled node cannot be expanded/collapsed directly (search can do it) or traversed using keyboard, or selected. |
| title | string | undefined | No | The label for the node to be shown in the tree, used by the default item renderer |
| children | array of (TreeItem) objects | undefined | No | Child nodes under the current node. Note that if loadOnDemand is used then children should be set to null(??) |

### Default ItemRenderer Component

#### Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| item | TreeItem (required) | Null | Yes | The root node to render |


#### Style Classes

| Name | Location | Description |
| -- | -- | -- |
| root | root node of the item renderer | The root class which is the best place to put default styles used in the node |

## Design patterns for examples

* Render a sample tree showing how to connect
* Create a directory view in a tree (load a directory, show files, ...)
* Search for a TreeItem (by title)
* Search for a TreeItem (by ref)
* How to show a node in loading state when loadOnDemand is enabled?
