# TreeView Component

**TreeView** is a component that creates a hierarchical display of data. Example uses of TreeViews include a corporate hierarchy, a directory structure, a documentation center, and so on.

## Elements

![TreeView example](./assets/treeview.png)

A TreeView is composed of nodes. Each node (referred to internally as a TreeItem) can have additional nodes as children. If a node has children, then the node also has an "expand" icon (typically an arrow) to expand and collapse that particular node.

## API

### Component Props

| name        | type                                  | defaultValue | isRequired | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| dataSource | Object[] | none | yes | The data source of the TreeView which is used to render nodes. |
| mapChildren | function | none | yes | Maps children for the item renderer. |
| itemRenderer | function | default function | no | Overrides the default function for rendering nodes.<br>`function(item: TreeItem)` |
| selectedItem | Object reference | null | no | The selected object, by default none, is selected. |
| keyboardNavigation | boolean | true | no | When enabled, user can traverse the tree using keyboard arrow keys. |
| loadOnDemand | boolean | false | no | Whether parent nodes are populated with children before they are expanded. |
| loadMethod | function | null | no | The method used to load the children of a node when loadOnDemand is true.<br>`function(item: TreeItem)`<br>returns a promise or a list of Objects |
| filter | function | default function | no | The default function searches according to the node title with exact prefix matching.<br>`function(item: Object)`|
| onSelect | function | null | no | Triggered when a selection has been changed. |
| onExpand | function | null | no | Triggered when a node is expanded. |
| onCollapse | function | null | no | Triggered when a node is collapsed. |

### Methods

| name        | parameters                                  | description               |
| ----------- | ------------------------------------- | ------------------------------- |
| collapse | item: Object (required) | Collapses all nodes under a provided node. |
| collapseAll | none | Collapses all the tree nodes. |
| expand | item: TreeItem (required) | Expands all nodes under a provided node. |
| expandAll | Boolean: deep (default) or shallow | Expands all the tree nodes. |
| selectItem | item: Object (required) | Selects an item in the tree. |


### Code Examples

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
            { label: 'Fillet Steak' },
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
<TreeView dataSource={data} />
```

* Renders a TreeView with the ability to select an item.

```
const parentState = {
  selectedItem: Object;
};

function onSelectItem(selectedItem) {
  this.state.selectedItem = selectedItem;
}

<TreeView dataSource={data} selectedItem={this.state.selectedItem} onSelectItem={this.onSelectItem.bind(this)} />
```

* Render a TreeView (one icon, several nodes hierarchy) using the traverse children and a non-default item renderer that has a type for a parent node and different type for all children.

```
const data = [
    {

      "id": 1,
      "name": "Felix",
      "mood": "crazy",
      "owner": { "id": 5, "name": "Pat Sullivan" }
      "kittens": [
          {
            "name": "Son1",
            "mood": "reasonable"
          },
          {
            "name": "Daughter1",
            "mood": "unreasonable"
          }
      ]

    },
    {
      "id": 2,
      "name": "Gorbachev",
      "mood": "awesome",
      "owner": { "id": 6, "name": "Aaron Patterson" }
    }
  ];
```

