# Popup Component

**Popup** is a component that pops up content and positions it next to an anchor element. A Popup is overlayed over the page. A Popup is a temporary view and only one popup can be rendered on the page at one time.

## Component API

### Component Props

| name        | type                                  | defaultValue | isRequired | description                              |
| ----------- | ------------------------------------- | ------------ | ---------- | ---------------------------------------- |
| anchor | Node \| Point | none | Yes | The element to be used as an anchor for the popup (will open next to it). |
| open | boolean | false | no | Whether to show or hide the Popup |
| onOpen | Triggered when the popup is opened | NOOP | no | Triggered when the popup is shown. |
| onClose | Triggered when popup is closed | NOOP | no | Triggered when the popup is closed. |

The following props should be placed in an IPopupProps interface since they will need to be passed from higher order components.

| name        | type                                  | defaultValue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | isRequired | description                              |
| --- | --- | --- | --- | --- |
| anchorPosition | IPositionPoint | { vertical: 'bottom', horizontal: 'left' } | no | The point on the anchor element to which the popupPosition will attach to |
| popupPosition | IPositionPoint | { vertical: 'top', horizontal: 'left' } | no | The point from which the popupPosition will pivot |
| collision | ICollision| { vertical: 'none', horizontal: 'none' } | No | Specify the collision behavior of the component. |
| syncWidth	| boolean |	true | no | If true, the width of the popup will be set to the width of the anchor. If false, it will be set to the width of the children. |
| maxHeight | number | 500 | no | The max height in pixels of the popup. If set to 0, the property will be ignored and the compenent receives height from its content. |

### Code Example

Given a popup is attached to an element, when it's rendered it should appear on the screen.

    ```
    <div ref="anchor">Anchor</div>
    <Popup anchor={this.refs.anchor}>
        <label>Popup Header</label>
        <div>Popup Body</div>
    </Popup>
    ```



## Style API

> TBD