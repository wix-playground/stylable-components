# Sample Component

Brief component description

> e.g.
> **Toggle** is a component representing a physical switch that allows users to turn things on or off, like a light switch. Use **Toggle** to present users with two mutually exclusive options (such as on/off, black/white, yes/no), where choosing an option provides immediate results.



## Elements

Screenshot & brief elements description

> e.g.
> Screenshot of the component (http://joxi.ru/bmonQewtMy479r)
> **Toggle** consists of:  **switch**, **icon**, and **background**. The **switch** moves across the **background** in order to set the value to On/Off, and **icon** indicates the state of the value.



## API

### Component Props

| name     | type    | defaultValue | isRequired | description                              |
| -------- | ------- | ------------ | ---------- | ---------------------------------------- |
| disabled | boolean | false        |            | If `true`, the componentName will not be interactive. |
| label    | string  |              |            | Text to display in accessibility mode.   |
| name     | string  |              |            | The name of the slider. Behaves like the name attribute of an input element. |
| error    | bool    | FALSE        |            | Sets the `:error` CSS state on the `<slider>` |
| rtl      | bool    | FALSE        |            | Makes the component RTL                  |



#### Accepted Children ( if applicable )

List of accepted children

> e.g.
> This component accepts children with the following `data-slot` attribute, in order to *tell why do we need data-slot in current component*
>
> | data-slot | description                              | example                                  |
> | --------- | ---------------------------------------- | ---------------------------------------- |
> | tooltip   | Allows you to insert a component (or components) above the input | `<div data-slot="tooltip">hello world</div>` |



### Code Example

**Example 1:**

```jsx
//code example goes here
```

*Comments to example 1*


**Example 2:**

```jsx
//code example goes here
```

*Comments to example 2*



## Style API

### Subcomponents (pseudo-elements)

| selector | description                              | type                                     |
| -------- | ---------------------------------------- | ---------------------------------------- |
| ::switch | Allows styling the switch of the toggle. | HTML Element - This subcomponent has no subcomponents of its own.* |



### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :hover, :focus, :disabled, etc | Standard CSS states                      |



### Style Code Example

```css
/* Code example goes here
~ Example of styling with Subcomponents
~ Example of styling with CSS State */
```