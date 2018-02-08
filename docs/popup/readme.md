# Popup Component

**Popup** is a fully-typed React component that shows content and positions it next to an anchor element. A Popup is overlayed over the page. A Popup is a temporary view and only one popup can be rendered on the page at one time.

## Component API

### Component Props

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| anchor | Element \| Point | none | Yes | The element to be used as an anchor for the popup (will open next to it). |
| open | boolean | false | no | Whether to show or hide the Popup |
| anchorPosition | PositionPoint | { vertical: 'bottom', horizontal: 'left'} | no | The point on the anchor element to which the popupPosition will attach to |
| popupPosition | PositionPoint | { vertical: 'top', horizontal: 'left'} | no | The point from which the popupPosition will pivot |
| collision | ICollision| {'vertical: 'none', horizontal: 'none'} | No | Specify the collision behavior of the component |
| syncWidth	| boolean |	true | no | If true, the width of the popup will be set to the width of the anchor. If false, it will be set to the width of the children.* Not relevant for a point anchor type.|
| autoPosition	| boolean |	false | no | If true, the Popup will automaticaly set it placement based on anchor position and content size.|

### Code Example

Given a popup is attached to an element, when it's rendered it should appear on the screen.

```jsx
    <div ref="anchor">Anchor</div>
    <Popup anchor={this.refs.anchor}>
        <label>Popup Header</label>
        <div>Popup Body</div>
    </Popup>
   ```
