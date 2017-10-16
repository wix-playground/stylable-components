# Dropdown Components Specification

## Definition

The dropdown type components include **Dropdown**, **AutoComplete**, and **MultiSelect**. The **Popup** and **SelectionList** components are used internally with their prop interfaces enriching **Dropdown** with their functionality.

## Elements

### Dropdown & AutoComplete

![Image of dropdown elements](./assets/dropdowns/DropdownElements.png)

### MultiSelect

![Image of dropdown elements](./assets/dropdowns/MultiSelectElements.png)

## Properties

All dropdowns use the following interfaces:

* [Popup component props]()
* [SelectionList component props]()

#### Common Props (all dropdowns)

| name | type | default | required | description |
| --- | --- | --- | --- | --- |
| disabled | boolean | false | no | see HTML specs |
| autoFocus | boolean | false | no | see HTML specs |
| open | boolean | false | no | Whether the Popup is shown. |
| openOnFocus | boolean | false | no | Whether the Popup opens automatically when focus is gained. |
| onChange | (id: string) => void | NOP | no | Triggered when an item is selected in the list. |
| hideSelected | boolean | false | no | Hides selected values so that they do not appear in the selection list. |
| children | any | null | no | Children to be rendered in the list, see SelectionList for further details. |

#### Dropdown Props

| name | type | default | required | description |
| --- | --- | --- | --- | --- |
| value | string | null | no | ID of the selected item. |

#### AutoComplete Props

**AutoComplete** is an extension of an input field of type text, thereby expanding its props.

| name | type | default | required | description |
| --- | --- | --- | --- | --- |
| allowFreeText | boolean | true | no | Allows user to enter text which does not appear in the suggestion list. |
| showNoSuggestions | boolean | false | no | Shows a message when there are no suggestions to show a user. |
| noSuggestionsNotice | string \| function | "No Results" | no | Message to show in popup when there are no suggestions for the user. If a function is used, then it renders an element in the popup. |
| selected | string | null | no | ID of the selected item. |
| filter | function | prefix search function | no | Function used to filter results according to the input. |
| minCharacters | number | 0 | no | Number of characters required in the input before suggestions appear. |
| maxSearchResults | number | 0 (unlimited) | Maximum number of results to show for a filter match. |

#### MultiSelect Props

Supports AutoComplete props as well as the native text input props.

| name | type | default | required | description |
| --- | --- | --- | --- | --- |
| selected | Array\<String> | empty | no | List of selected IDs. |
| maxSelected | number | 0 (unlimited) | no | Number of selections allowed. |

### Code Examples

> TBD

## Styles

### Styles for DropDown and AutoComplete

| name | description |
| --- | --- |
| input | The dropdown input container. |
| toggle | The toggle used in the input container. |

### Styles for MultiSelect

| name | description |
| --- | --- |
| input | The dropdown input container. |
| clear | The **x** button that clears the input container. |
| tag | The tag box inside the input container. |
| tagDelete | The **x** button that deletes a specific tag. |

See SelectionList for further styles.

### States

| name | description |
| --- | --- |
| active | self explanatory |
| focus | self explanatory |
| disabled | self explanatory |
| readonly | Relevant for AutoComplete and MultiSelect. |
| hover | self explanatory |

### Style Code Examples

> TBD