# \<Image /> component

The **Image** component represents an image on the DOM.

It accepts all native `<img />` attributes, with several additional features listed below.

| name        | type       | default | required | description       |
| ----------- | ---------- | ------- | -------- | ----------------- |
| resizeMode | oneOf('fill', 'cover', 'contain') | 'fill' | no | Defines how the Image responds to the height and width of its content box. |
| defaultImage | string |  | no | URL to load when src is not provided|
| errorImage | string |  | no | URL to load if src (or defaultImage) are broken|

## Features
 
### Resize Modes

`<Image>` allows specifying a `resizeMode` prop with these possible values: `fill`, `contain`, and `cover`. The behavior of `resizeMode` is the same as that of the CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) prop, except that `resizeMode` supports older browsers that don't support `object-fit`.

> Note: Just as in `object-fit`, `resizeMode` only affects images with both width and height axes provided (e.g. `width: 200px; height: 200px;`).

### Avoiding user-agent "broken image" outline

When an `<img />` has no `src` prop, or it fails to load the specified image, some web browsers show a "broken image" placeholder or an outline around the element. These typically do not conform to the page design causing the page to appear broken.

The `<Image />` component allows supplying `defaultImage` to replace `src` if missing. If the source fails loading `errorImage` will be displayed. If `errorImage` is not supplied the `<Image/>` component will render an empty pixel.

```
src -> defaultImage -> errorImage -> one empty pixel
```

### Style States
| state | description|
| ----- | -----------|
| :loading | Styles the Image when image is loading
| :loaded | Styles the Image after it loads successfully
| :error | Styles the Image after if it fails during loading
