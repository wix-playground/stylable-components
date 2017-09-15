## ContextProvider

Use `ContextProvider` component to pass information down the rendering tree and DOM.

When you render `<ContextProvider>...</ContextProvider>`, a default div HTML element is created in its place and any properties set on ContextProvider are routed to the rendered HTML element.

### API
| property    	| type                     | default value| description
|-------------	|--------------------------|--------------|---------------------------
| tagName		| keyof ReactHTML          | 'div'		  | Override HTML tag used for rendering the component
| dir    		| 'left' | 'right' | 'auto'|     		  | HTML `dir` property. Goes to `contextProvider.dir` context property
| className   	| string                   |     		  | HTML `class` property
| styles     	| object                   |     		  | Inline styles
| *         	| any                      |     		  | Goes to `contextProvider.*` context property

### Usage

```tsx
<ContextProvider tagName="ul" dir="ltr" style={{color:'red'}} x={valueX}>
    <header>
        <h1>Cheeses of Nazareth: Middle-Eastern Dairy Product Suppliers</h1>
    </header>
</ContextProvider>
```

### Sub Context Provider

```tsx
<ContextProvider dir="ltr" x={valueX}>
    <header>
        <h1>Cheeses of Nazareth: Middle-Eastern Dairy Product Suppliers</h1>
    </header>
    <ContextProvider dir="rtl" x={valueZ}>
        <p>טקסט בעברית שמיושר לימין כנראה...</p>
    </ContextProvider>
</ContextProvider>
```
