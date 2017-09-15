# Context Provider

Use `ContextProvider` component to pass information down the rendering tree and DOM.

When you render `<ContextProvider>{...}</ContextProvider>`, a default `div` HTML element is created in its place and specific properties set on `ContextProvider` are routed to the rendered HTML element, while other are passed to the special `contextProvider` object in context.

## Special Properties

Some properties are meant to be used for rendering context or HTML output config:

| property    	    | value              	| rendered to DOM          	| Available in react context
|-------------	    |--------------------	|--------------------------	|---------------------------
| tagName     	    | `string`           	| modify the HTML tag name 	| -
| style         	| `object`          	| inline styles             | -
| className         | `string`          	| class attribute           | -
| dir         	    | `rtl / ltr / auto` 	| dir attribute         	| `contextProvider.dir`
| myProp *any name* | any                	| -                        	| `contextProvider.myProp`

## Usage

```jsx
<ContextProvider tagName="ul" className="list" dir="ltr" style={{color:'red'}} x={valueX}>
    <header>
        <h1>Cheeses of Nazareth: Middle-Eastern Dairy Product Suppliers</h1>
    </header>
</ContextProvider>
```

The context object `{contextProvider: {dir: 'ltr', x: valueX}` will be past down the render and the following HTML will output:

```html
<ul dir="ltr" class="list" style="color:red">
    <header>
        <h1>Cheeses of Nazareth: Middle-Eastern Dairy Product Suppliers</h1>
    </header>
</ul>
```

### Sub Context Providers

```jsx
<ContextProvider dir="ltr" x={valueX}>
    <header>
        <h1>Cheeses of Nazareth: Middle-Eastern Dairy Product Suppliers</h1>
    </header>
    <ContextProvider dir="rtl" x={valueZ}>
        <p>טקסט בעברית שמיושר לימין כנראה...</p>
    </ContextProvider>
</ContextProvider>
```

The context object `{contextProvider: {dir: 'ltr', x: valueX}}` will be past down the render to the `header` and `h1` while the context object `{contextProvider: {dir: 'rtl', x: valueZ}}` will be past to the `p` element and the following HTML will output:

```html
<div dir="ltr">
    <header>
        <h1>Cheeses of Nazareth: Middle-Eastern Dairy Product Suppliers</h1>
    </header>
    <div dir="rtl">
        <p>טקסט בעברית שמיושר לימין כנראה...</p>
    </div>
</div>
```
