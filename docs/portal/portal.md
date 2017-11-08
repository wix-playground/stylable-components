**Table of Contents**

- [Description](#description)

- [Elements](#elements)

- [API](#api)

- [Behavior](#behavior)



## Description

The *Portal* component renders children into container appended to the document.body.

### Elements

The portal consists of a div that contains the component's given children.

## API

**Props**

| name | type | default | required | description |
| -- | -- | -- | -- | -- |
| children | React.ReactNode | null | no | The elements to be rendered in the portal | 

**Style**

The portal wraps its children and places them in a different location in the DOM. Because of this, when styling, keep in mind that chaining styles may not work as the children are taken out of the normal flow and placed directly under the body.

Styling of the portal wrapper (Giving it a fixed size for example) should be done with inline styling. 

### Behavior

The *Portal* component returns an empty span where it was placed. It wraps its children in a div, placing them on top of all other elements (Attaching them directly to the body).

