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

### Behavior

The *Portal* component returns an empty span and wraps its children in a div, placing them on top of all other elements (Attaching them to the body).

