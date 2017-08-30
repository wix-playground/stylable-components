# &lt;Image /&gt; component

The Image component represents an image on the DOM.

It accepts all native `<img />`'s attributes, with several additional features listed below.

## Features
 
 ### Resize Modes

`<Image>` allows specifying a resizing behavior via the **resizeMode** prop.

Possible values:
- `'fill'`
- `'contain'`
- `'cover'`

The behavior of each value is the same as CSS's [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit), yet it supports older browsers by imploying the `background-image` and `background-size` .

> It should be noted that, similarly to `object-fit`, these modes only affect images with both axis provided (e.g. `width: 200px; height: 200px;`).


### Avoiding user-agent outline

When an image has no `src`, or fails loading one, some web browsers show a broken image placeholder or an outline around the element. Many times, these do not fit the rest of the design, and cause the page to appear broken.

The `<Image />` component normalizes this behavior by implementing source fall-back mechanism:

```
src -> defaultImage -> one empty pixel
```

If `src` fails loading, or is missing, `defaultImage` is used. If that one fails loading, the component will fall back to using one empty pixel.
