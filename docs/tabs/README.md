# Tabs

Tabs components makes it easy to explore and switch between different views.

Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time. Each tab panel has an associated tab element, that when activated, displays the panel. The list of tab elements is arranged along one edge of the currently displayed panel, most commonly the top edge.

## Elements

![elements](./assets/elements.png)

**Tab consist of:** 

1. Tab Interface - set of tab elements and their associated tab panels
2. Tab List - set of tab elements contained in a tablist element.
3. Tab - element in the tab list that serves as a label for one of the tab panels and can be activated to display associated panel.
4. Tab Panel - element that contains the content associated with a tab.

When a tab interface is initialized, one tab panel is displayed and its associated tab is styled to indicate that it is active. When the user activates one of the other tab elements, the previously displayed tab panel is hidden, the tab panel associated with the activated tab becomes visible, and the tab is considered "active".

## API

#### Component Props

| name             | type                           | defaultValue | isRequired | description                              |
| ---------------- | ------------------------------ | ------------ | ---------- | ---------------------------------------- |
| onChange         | func                           |              | yes        | Callback function that is fired when the tab value changes |
| tabList          | array of strings /  components |              |            | Allows to pass simple strings (e.g. "tab one", "1") OR components (e.g. string with an icon) |
| activeTabId      | number                         |              |            | Controls which tab is active             |
| defaultTabId     | number                         |              |            | Controls tab that is active by default (e.g. when component is mounted) |
| killInactiveTabs | function / bool?               | false        |            | Allows to unload inactive tabs           |
| position         | enum                           | up           |            | Controls the location of tabs relative to the tab panel. Accepted values are: up/down/left/right |
| disabled         | bool                           | false        |            | If true, tabs are not actionable         |
| rtl              | bool                           | false        |            | Makes the component RTL                  |



### React Code Example

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

#### Subcomponents (pseudo-elements)

| selector       | description                              |
| -------------- | ---------------------------------------- |
| ::tabInterface | Allows to style the entire tab component |
| ::tabList      | Allows to style tab elements contained in a tab list element |
| ::tabPanel     | Allows to style tab panel                |

#### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :hover, :focus, :disabled, etc | Standard CSS states                      |



### Style Code Example

```css
//code example goes here
```