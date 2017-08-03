# TreeView Component

**TreeView** is a component that creates a hierarchical display of data. Example uses of TreeViews include a corporate hierarchy, a directory structure, a documentation center, and so on.

## Elements

![TreeView example](./assets/treeElements.png)

A TreeView is composed of TreeItems (nodes) that have a TreeItem Label and a TreeItem Icon if the node has children. The TreeItem Icon (typically an arrow) is used to expand and collapse that particular node.

## API

### Component Props

| name        | type                                  | default | required | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| selectedItem | Object reference | null | no | The selected object, by default none is selected |
| keyboardNavigation | boolean | true | no | When enabled, user can traverse the tree using keyboard arrow keys |
| loadOnDemand | boolean | false | no | Whether parent nodes are populated with children before they are expanded |
| loadMethod | function | null | no | The method used to load the children of a node when `loadOnDemand` is true<br>`function(item: TreeItem)`<br> ● returns promise or list of Objects |
| filter | function | default function | no | The default function searches according to the node title with exact prefix matching.<br>`function(item: object)` |
| onSelect | function | null | no | Event triggered when a selection has been changed |
| onExpand | function | null | no | Event triggered when a node is expanded |
| onCollapse | function | null | no | Event triggered when a node is collapsed |

##### The following props are placed in an `OptionList` interface since they need to be passed from higher order components.

| name | type | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | required | description |
| --- | --- | --- | --- | --- |
| dataSource | SelectionItem[] | [] | no | Collection of item data |
| dataSchema | object | { id: 'id',<br>displayText: 'displayText'} | no | Maps the object properties to the relevant properties required by the `itemRenderer` |
| itemRenderer | Component | default itemRenderer | no | Renders an item in the list |

> **Note** If both `dataSource` and children are present, the children are rendered first and then the `dataSource` items.

#### ItemRenderer

`ItemRenderer` renders the item text and draws an arrow icon (if relevant) for each node. It also adds the three tree events to each node it renders.

##### ItemRenderer Props

| name | type | default | required | description |
| --- | --- | --- | --- | --- |
| item | TreeItem | none | yes | The root node to render |

##### ItemRenderer Style

The following style states are supported for TreeItem. It's possible that multiple styles are applied to a TreeItem (e.g. hover and emabled).

* hover
* expanded true/false/pending
* selected
* enabled

The following static styles should be used:

| name | description |
| --- | --- |
| root | The root class for the node |
| icon | The style for the arrow icon which appears only if child nodes are available |
| title | The style for the node title |

### Component Methods

| name        | parameters                                  | description               |
| ----------- | ------------------------------------- | ------------------------------- |
| collapse | item: object (required) | Collapses all nodes under a provided node |
| collapseAll | none | Collapses all the tree nodes |
| expand | item: TreeItem (required) | Expands all nodes under a provided node |
| expandAll | boolean: deep (default) or shallow | Expands all the tree nodes |
| selectItem | item: object (required) | Selects an item in the tree |

## Input Handling

### Keyboard Navigation

| key | action |
| --- | --- |
Home | highlights the first open TreeItem in the TreeView
End | highlights the last open TreeItem in the TreeView
Enter | Selects current highlighted item (does not expand it though)
Up arrow | highlights previous item
Down arrow | highlights next item
Left arrow | * if child then highlights parent<br>* if parent then collapses it
Right arrow | * expands item and highlights it<br>* if item was already expanded then highlights the first child

## Code Examples

**Sample data for the examples.**

```
const treeData: TreeItemData[] = [
    { label: 'Food Menu', children: [
        { label: 'Salads', children: [
            { label: 'Greek Salad' },
            { label: 'Israeli Salad' },
            { label: 'Caesar Salad' }
        ]},
        { label: 'Steaks', children: [
            { label: 'Filet Steak' },
            { label: 'Sirloin Steak' }
        ]},
        { label: 'Desserts', children: [
            { label: 'Pancakes' },
            { label: 'Muffin' },
            { label: 'Waffle' },
            { label: 'Cupcake' }
        ]}
    ]}
];
```

**Example views**

* Renders a TreeView

```
<TreeView dataSource={treeData} />
```

* Renders a TreeView with the ability to select an item.

```
const parentState = {
  selectedItem: Object;
};

function onSelectItem(selectedItem) {
  this.state.selectedItem = selectedItem;
}

<TreeView dataSource={treeData} selectedItem={this.state.selectedItem} onSelectItem={this.onSelectItem.bind(this)} />
```
