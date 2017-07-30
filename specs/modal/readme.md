# Modal

The **Modal** component is a window that opens subordinate to an application's main window. It breaks the application flow. In practice, it usually leaves the main app visible in the background (usually faded out). Users must interact with the modal in order to return to the application flow.

Interacting with the modal can consist of:  
- clicking its action button(s)
- clicking its backdrop
- clicking its close/cancel button(s)

## Use Cases

* A modal can be used to edit a complex formula inside of a spreadsheet
* A modal can be used in order to require sign-in before using a certain feature of an app
* A modal can be used to display a photograph or video in focus on top of the screen

## Basic Implementatoin

### Modal Traits

The **Modal** component allows the user to control the following configutations:  
* `isOpen` indicates that the modal is open and shown on the screen
* `backdropClosesModal` indicates whether clicking the backdrop of this modal should close it
* `onRequestClose` is an optional function that runs when closing the modal is requested
* [Position](#modal-position) & [sizing](#modal-sizing)

```html
<Modal
    isOpen={bool}
    backdropClosesModal={bool}
    onRequestClose={function}
/>
```

### Modal Building Blocks

#### Modal.Header



#### Modal.Body



#### Modal.Footer



### Modal Position

Usually, the modal opens in relation to the screen and not its parent component. Because it breaks the flow of the entire page, it needs to be prominent on the entire view-port. 

Its positions are top, **middle**, bottom and left, **center**, right (defaults bolded).

It can have an offset from each of its non-default positions (top, bottom, right, left). The offset direction is opposite to its starting position (leftOffset pushes left to right, rightOffset pushes right to left).

```html
<Modal
  position='left'
  isOpen={true}
  topOffset={10}
  leftOffset={10}
  <div>
    content
  </div>
</Modal>
```

#### Contained modals

There are special cases where a modal is relevant only to a certain part of an application, and 

```html
<Modal
  position='left'
  isOpen={true}
  topOffset={10}
  leftOffset={10}
  container={this}>
  <div>
    content
  </div>
</Modal>
```

### Modal Sizing

The modal size 


```html
<Modal ... width="small">...</Modal>
<Modal ... width="large">...</Modal>
<Modal ... width={768}>...</Modal>
```



## Advanced Implementation

### Dynamic Sizing




## Modal Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
|backdropClosesModal | bool | false | Pass through to make the backdrop available as a target to dismiss the modal|
| isOpen | bool | false | Managed by state; this is how to control the visibility of the modal|
| onRequestClose | func | undefined | The function used to handle cancel events on the modal; typically sets the open state to false|
| width | number/enum | 'medium' | Explicitly set a numeric width or provide one of three sizes; 'small', 'medium', 'large' - 320px, 640px, 960px respectively|
| height ||||


### Modal Header Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
|children | node | undefined | Alternative to using the text attribute, for when you need more control over the content|
|showCloseButton | bool | true | Allow users to dismiss the modal|
|onClose | func | undefined | What to do when the user clicks the close button|
|title | string | '' | Creates a title for the modal. We use "text" because title is reserved|

## Accessibility

Be sure to add role="dialog" and aria-labelledby="...", referencing the modal title, to .modal, and role="document" to the .modal-dialog itself. Additionally, you may give a description of your modal dialog with aria-describedby on .modal.

Use the property aria to pass any additional aria attributes. It accepts an object where the keys are the names of the attributes without the prefix aria-.

Example:

<Modal
  isOpen={modalIsOpen}
  aria={{
    labelledby: "heading",
    describedby: "full_description"
  }}>
  <h1 id="heading">H1</h1>
  <div id="full_description">
    <p>Description goes here.</p>
  </div>
</Modal>


The app element allows you to specify the portion of your app that should be hidden (via aria-hidden) to prevent assistive technologies such as screenreaders from reading content outside of the content of your modal.

It's optional and if not specified it will try to use document.body as your app element.

If you are doing server-side rendering, you should use this property.

It can be specified in the following ways:

DOMElement
Modal.setAppElement(appElement);
query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');


The Modal object has two required props:

isOpen to render its children.
contentLabel to improve accessibility, since v1.6.0.
Example:

## Examples

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>