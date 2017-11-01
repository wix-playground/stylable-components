**Table of Contents**

- [Description](#description)

- [API](#api)

- [States](#states-(if-applicable))

- [Accessibility](#accessibility)

- [Behavior](#behavior)

- [DOM Structure](#dom-structure)

  ​



## Description

The **Image** component represents an image on the DOM.

## API

**Props**

See [README.md](./README.md) for more info. 

**Style**

See [README.md](./README.md) for more info. 

## States

| State   | Description                              | 
| :------ | :--------------------------------------- | 
| Loading | Image source is being loaded             | 
| Loaded  | Image source was loaded successfully          | 
| Error   | Image source failed loading | 



## Accessibility

> TBD


### Behavior

 
#### Resize Modes

`<Image>` allows specifying a `resizeMode` prop with these possible values: `fill`, `contain`, and `cover`. The behavior of `resizeMode` is the same as that of the CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) prop, except that `resizeMode` supports older browsers that don't support `object-fit`.

> Note: Just as in `object-fit`, `resizeMode` only affects images with both width and height axes provided (e.g. `width: 200px; height: 200px;`).

#### Avoiding user-agent "broken image" outline

When an `<img />` has no `src` prop, or it fails to load the specified image, some web browsers show a "broken image" placeholder or an outline around the element. These typically do not conform to the page design causing the page to appear broken.

The `<Image />` component allows supplying `defaultImage` to replace `src` if missing. If the source fails loading `errorImage` will be displayed. If `errorImage` is not supplied the `<Image/>` component will render an empty pixel.

```
src -> defaultImage -> errorImage -> one empty pixel
```

Source loading and resulting states breakdown table:

| src | defaultImage | errorImage | source to be displayed | component status |
| --- | ------------ | ---------- | ---------------------- | ---------------- |
| ✔ | |  | src | Loaded |
|  |✔ |  | defaultImage | Loaded |
|  | |  | one empty pixel | Loaded |
|  |  | ✔ | one empty pixel | Loaded |
| ✔ | ✔ |  | src | Loaded |
| ✖ |  | ✔ | errorImage | Error |
|  | ✖  | ✔ | errorImage | Error |
| ✖ |  | ✔ | errorImage | Error |
| ✖ |  |  | one empty pixel | Error |
|  | ✖ |  | one empty pixel | Error |
|  | ✖ | ✖ | one empty pixel | Error |
|  | ✖ | ✖ | one empty pixel | Error |
|  |  | ✖ | one empty pixel | Loaded |



legend:

✔ - source provided and is loaded successfully

✖ - source provided but loading results in error

(empty) - source was not provided



## DOM structure
> TBD
