# Modal

The **Modal** component is a window that opens subordinate to an application's main window. It breaks the application flow. In practice, it usually leaves the main app visible in the background (usually faded out). Users must interact with the modal in order to return to the application flow.

Interacting with the modal can consist of:  
- clicking its primary button(s)
- clicking its backdrop
- clicking its close/cancel button(s)

## Use Cases

* A modal can be used to edit a complex formula inside of a spreadsheet
* A modal can be used in order to require sign-in before using a certain feature of an app
* A modal can be used to display a photograph or video in focus on top of the screen

## Basic Implementatoin

### Modal Attributes

The **Modal** component allows the user to control the following configutations:  
* `isOpen` indicates that the modal is open and shown on the screen
* `backdropClosesModal` indicates whether clicking the backdrop of this modal should close it
* `onRequestClose` is an optional function that runs when closing the modal is requested
* [Position](#modal-position) 
* [Sizing](#modal-sizing)

```html
<Modal
    isOpen={bool}
    backdropClosesModal={bool}
    onRequestClose={function}
/>
```

### Modal Position

Usually, the modal opens in relation to the screen and not its parent component. Because it breaks the flow of the entire page, it needs to be prominent on the entire view-port. 

Its possible positions are top, **middle**, bottom and left, **center**, right (defaults bolded).

It can have an offset from each of its non-default positions (top, bottom, right, left). The offset direction is opposite to its starting position (leftOffset pushes left to right, rightOffset pushes right to left).

```html
<Modal
  position={left}
  topOffset={10}
  leftOffset={10}>
</Modal>
```

#### Contained modals

There are special cases where a modal is relevant only to a certain part of an application, and will only block its flow.

```html
<Modal
  ...
  container={this.container}>
  <div>
    content
  </div>
</Modal>
```

### Modal Sizing

The modal size has 3 presets (small, medium and large), and can accept custom width and height using the `width` and `height` attributes. If `height` is declared, overflow can be declared or will default to `overflow:visible`.


```html
<Modal width={width.small}></Modal>
<Modal width={width.large}></Modal>
<Modal width={768}></Modal>
```

## Modal Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
|backdropClosesModal | bool | false | Pass through to make the backdrop available as a target to dismiss the modal|
| isOpen | bool | false | Managed by state; this is how to control the visibility of the modal|
| onAfterOpen | func | undefined | |
| onRequestClose | func | undefined | The function used to handle cancel events on the modal; typically sets the open state to false|
| width | number/enum | 'medium' | Explicitly set a numeric width or provide one of three sizes; 'small', 'medium', 'large' - 320px, 640px, 960px respectively|
| height | number/enum | 'auto' | Explicitly set a numeric height of the modal|

## Stylable API

### Modal Building Blocks

![Modal](./assets/modal-basic.png)

| element | stylable class |
|---|---|
| modal header | `.Modal::modal-header` |
| modal header title | `.Modal::modal-header > .title` |
| modal header close button |`.Modal::modal-header > .close-button`|
| modal body | `.Modal::modal-body` |
| modal footer | `.Modal::modal-footer` |
| modal footer close button | `.Modal::modal-footer .close-button` |
| modal footer primary button | `.Modal::modal-footer  .primary-button` |
| backdrop | `.Modal::backdrop` |

## Accessibility

The Modal component is by default given `aria-role="dialog"`, and an empty string for `aria-labelledby=""`. 

You may pass the Modal a prop `aria` to fill any aria related attributes. It accepts an object where the keys are the names of the attributes without the prefix `aria-`.

```jsx
<Modal aria={{role: 'dialog', labelledby: ''}}>
</Modal>
coming soon...
```
You may optionally give a description of your modal  with `aria-describedby`.

/TODO: aria-hidden/

## Examples
