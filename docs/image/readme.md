# \<Image /> component

The **Image** component represents an image on the DOM.

It accepts all native `<img />` attributes, with several additional features listed below.

## Features
 
### Resize Modes

`<Image>` allows specifying a `resizeMode` prop with these possible values: `fill`, `contain`, and `cover`. The behavior of `resizeMode` is the same as that of the CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) prop, except that `resizeMode` supports older browsers that don't support `object-fit`.

> Note: Just as in `object-fit`, `resizeMode` only affects images with both width and height axes provided (e.g. `width: 200px; height: 200px;`).

### Avoiding user-agent "broken image" outline

When an `<img />` has no `src` prop, or it fails to load the specified image, some web browsers show a "broken image" placeholder or an outline around the element. These typically do not conform to the page design causing the page to appear broken.

The `<Image />` component normalizes this behavior by implementing an image source fall-back mechanism:

```
src -> defaultImage -> one empty pixel
```

If `src` fails loading or is missing, `defaultImage` is used. If `defaultImage` fails loading, the component will fall back to using one empty pixel.
