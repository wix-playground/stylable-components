# Circular Loader

Circular Loader is a component that rotates to show the progress of a task or that there is a wait for a task to complete.

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.



## Elements

All elements of the component and their interactivity will be described, including a visual representation of it (image or animations).

e.g.

[![elements](https://github.com/wix/stylable-components/raw/master/docs/spec-template/assets/elements.png)](https://github.com/wix/stylable-components/blob/master/docs/spec-template/assets/elements.png) **Toggle** consists of: **switch**, **icon**, and **background**. The **switch** moves across the **background** in order to set the value to On/Off, and **icon** indicates the state of the value.



## API

#### Component Props

| name     | type                                | defaultValue    | isRequired | description                              |
| -------- | ----------------------------------- | --------------- | ---------- | ---------------------------------------- |
| mode     | enum: `determinate` `indeterminate` | `indeterminate` |            | Determines the type of the component. Indeterminate mode shows loader without no connection to the loading progress. |
| value    | number                              | 0               |            | The value of progress. NOTE: works only for determinate mode. |
| showInfo |                                     |                 |            | Displays the progress value of the loading process AND/OR text |
| delay    | number                              |                 |            | Specifies a delay in milliseconds for loading state |
| status   | string                              |                 |            | Sets the status of the loading progress. Options: `success` `exception` `active` |



### React Code Example

**Example 1:**

```
//code example goes here
```

*Comments to example 1*



**Example 2:**

```
//code example goes here	

```

*Comments to example 2*



## Style API

#### Subcomponents (pseudo-elements)

| selector   | description                              | type                                     |
| ---------- | ---------------------------------------- | ---------------------------------------- |
| ::progress | Allows styling the progress of the loader | HTML Element - This subcomponent has no subcomponents of its own |
| ::bar      | Allows to style the bar of the loader    |                                          |

#### Custom CSS States (pseudo-classes)

| state                          | description                              |
| ------------------------------ | ---------------------------------------- |
| :error                         | Style the component on error, i.e. when the `error` prop is true |
| :hover, :focus, :disabled, etc | Standard CSS states                      |

### Style Code Example

```

```