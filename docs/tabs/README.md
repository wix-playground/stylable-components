# Tabs

Tabs components makes it easy to explore and switch between different views.

Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time. Each tab panel has an associated tab element, that when activated, displays the panel. The list of tab elements is arranged along one edge of the currently displayed panel, most commonly the top edge.

## Elements

![elements](./assets/elements.png)

**Tab consist of:**

1. Tabs - set of tab elements and their associated tab panels (acts as root)
2. Tab List - set of all tab elements contained in component.
3. Tab - element in the tab list that serves as a label for one of the tab panels and can be activated to display associated panel.
4. Tab Panel - element that contains the content associated with a particular tab.

When a tab interface is initialized, one tab panel is displayed and its associated tab is styled to indicate that it is active. When the user activates one of the other tab elements, the previously displayed tab panel is hidden, the tab panel associated with the activated tab becomes visible, and the tab is considered "active".

## API

#### Tabs Props

| name             | type               | defaultValue | isRequired | description                              |
| ---------------- | ------------------ | ------------ | ---------- | ---------------------------------------- |
| onChange         | func               |              | yes        | Callback function that is fired when the tab value changes |
| children         | node               |              |            | Should be used to pass `Tab` components. |
| selectedTabKey   | string             |              |            | Controls which tab is active             |
| defaultTabKey    | number             |              |            | Controls tab that is active by default (e.g. when component is mounted) |
| killInactiveTabs | bool               | false        |            | When `false` component loads all tabs and tab panels content. When `true` component loads content related to active tab only. Switching between tabs unloads all previous content. |
| position         | enum               | up           |            | Controls the location of tabs relative to the tab panel. Accepted values are: up/down/left/right |
| disabled         | array (of tab IDs) |              |            | Specifies disabled tabs                  |



### React Code Example

**Example 1:**

```jsx
<Tabs
    selectedTabKey="2"
    onChange={key => handleChange(key)}
>
    <Tab key="1" label="Tab One">
        <p>This is hidden</p>
    </Tab>
    <Tab key="2" label="Tab Two">
        <p>This is selected</p>
    </Tab>
    <Tab key="3" label={component} disabled={true}>
        <p>This is disabled and cannot be selected</p>
    </Tab>
</Tabs>
```

*Comments to example 1*


**Example 2:**

```jsx
<Tabs
    disabled={true}
    selectedTabKey="2"
>
    <Tab key="1" label="Tab One">
        <p>This is disabled and cannot be selected</p>
    </Tab>
    <Tab key="2" label="Tab Two">
        <p>This is selected</p>
    </Tab>
    <Tab key="3" label={component}>
        <p>This is disabled and cannot be selected</p>
    </Tab>
</Tabs>
```

*Comments to example 2*



## Style API

#### Subcomponents (pseudo-elements)

| selector      | description                              |
| ------------- | ---------------------------------------- |
| ::tabList     | Allows to style container that stores all tabs |
| ::selectedTab | Allows to style selected tab             |
| ::tabPanel    | Allows to style tab panel                |

#### Custom CSS States (pseudo-classes)

| state                          | description         |
| ------------------------------ | ------------------- |
| :hover, :focus, :disabled, etc | Standard CSS states |



### Style Code Example

```css
Tabs::tabList {
    border: 1px solid limegreen;
    /* border around all tabs */
}
Tabs::tabs {
    background: green;
    /* every tab is green */
}
Tabs::selectedTab {
    background: yellow;
    /* selected tab is yellow */
}
```
