# Modal

The **Modal** component is a window that opens on top of the application's main window. It blocks the main application's interactivity, and the application flow. It typically leaves the main app visible and faded out in the background. Users must interact with the modal in order to return to the application flow.

## Elements

![Modal](./assets/elements.png)

The modal consists of a header, body and footer. The header usually contains a title and optionally a close button, the body contains the main modal content, and the footer usually contains a primary button and another close button. The modal has a backdrop that blocks interactivity with the rest of the screen.

Interacting with the modal can consist of:
  
- clicking its primary button
- clicking its backdrop
- clicking its close/cancel button(s)

## API

### Component Props

| name | type | default | required | description |
| --- | --- | --- | --- | --- |
| isOpen | boolean | false | yes | Managed by state; this is how to control the visibility of the modal. |
| onAfterOpen | function | NOOP | no | Invoked after the component is rendered. |
| onRequestClose(source) | function | NOOP |  | The function used to handle cancel events on the modal; typically sets the open state to false. It is passed a source, as one of a number of possible closing options. |
| children | any |  |  | Children nodes of the modal. |
| aria-* | - | - | - | ARIA attributes. Used for accessibility purposes, to describe the screen to a screen-reader. |
| aria-role | - | 'dialog' |  | Default ARIA attribute of the modal window, defines its role as a `dialog`. |

#### Modal Roles

Modal children can have a `role` attribute that allows them to declare which part of the modal is described by the node.

| role | class | description |
| --- | --- | --- |
| header | .header | The header of the modal, in many cases containing a title for the modal as well as a close button. |
| header-close-button | .header-close-button | The close button located in the header. Normally, located at the top-right corner of the modal. |
| header-title | .header-title | The title of the modal found in the header. |
| body | .header-body | The body of the modal. |
| footer | .footer | The footer of the modal, usually containing at least two options: 1) to close or cancel the action, 2) to perform the primary action required by the modal (e.g., submit the form, login to the app). |
| footer-close-button | .footer-close-button | The close or cancel button contained in the footer. |
| footer-primary-button | .footer-primary-button | The primary button of the modal. |

### Code Example

```jsx
<Modal
    isOpen="this.state.open"
    onRequestClose="this.whenModalCloses">
    <div role="header">
        <span role="title">Terms of service</span>
        <button role="header-close-button" />
    </div>
    <div role="body">
        <span>content</span>
    </div>
    <div role="footer">
        <button role="footer-primary-button">Yep</button>
        <button role="footer-close-button">Nope</button>
    </div>
</Modal>
```

## Style API

Normally, the modal opens in relation to the screen and not its parent component. Because it breaks the flow of the entire page, it needs to be prominent on the entire view-port. 

### Subcomponents (pseudo-elements)

| selector | description | type |
| --- | --- | --- |
| ::header | The header of the modal. | HTML Element |
| ::header-close-button | The close button in the header. | button |
| ::header-title | The title of the modal. | HTML Element |
| ::content | The main content of the modal. | HTML Element |
| ::footer | The footer of the modal. | HTML Element |
| ::footer-close-button | The close button in the footer. | button |
| ::footer-primary-button | The primary button of the modal. | button |
| ::backdrop | The background or overlay of the modal. | HTML Element |

### Custom CSS States (pseudo-classes)

| state | description |
|---|---|
| :open | The open state of the modal. |
| :loading | The loading state of the modal if it takes time to open. |
| :error | Modal displaying an error related to its loading. |
