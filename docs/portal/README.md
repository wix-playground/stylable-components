# Portal

The *Portal* component renders children into container appended to the document.body.

* [API](#api)
* [React Code Examples]

## API

| name | type | default | required | description |
| -- | -- | -- | -- | -- |
| children | React.ReactNode | null | no | The elements to be rendered in the portal |

## React Code Examples

```jsx

@stylable(styles)
export class PortalDemo extends React.Component<{}, {}> {

    render() {
        <Portal>
            I am a in a portal!
        </Portal>
    }

}

```
