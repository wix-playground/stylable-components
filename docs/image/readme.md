# &lt;Image /&gt; component

The Image component represents an image on the DOM.

It accepts all native `<img />` attributes, with several additional features listed below.

## Features
 
### Resize Modes

`<Image>` allows specifying a resizing behavior via the **resizeMode** prop.

Possible values:

- `fill`
- `contain`
- `cover`

The behavior of each value is the same as CSS's [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit), yet it supports older browsers by employing the `background-image` and `background-size` .

> It should be noted that, similar to `object-fit`, these modes only affect images with both axes provided (e.g. `width: 200px; height: 200px;`).


### Avoiding user-agent "broken image" outline

When an `<img />` has no `src` or fails loading one, some web browsers show a "broken image" placeholder or an outline around the element. These typically do not conform to the page design, causing the page to appear broken.

The `<Image />` component normalizes this behavior by implementing a source fall-back mechanism:

```
src -> defaultImage -> one empty pixel
```

If `src` fails loading or is missing, `defaultImage` is used. If `defaultImage` fails loading, the component will fall back to using one empty pixel.
