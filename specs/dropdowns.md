# Dropdown Components Specification

* [Definition](#definition)
* [Elements](#elements)
* [Properties](#properties)
* [Styles](#styles)
* [Accessibility](#accessibility)
* [Behavior](#behavior)
* [Examples](#examples)
* [Design](#design)

## Definition

The dropdown type components include the dropdown, autocomplete and multi-select. The Popup and SelectionList components are used internally, their prop interfaces enriching the dropdown with their functionality.

## Elements

### Dropdown & AutoComplete

![Image of dropdown elements](./assets/dropdowns/DropdownElements.png)

### MultiSelect

![Image of dropdown elements](./assets/dropdowns/MultiSelectElements.png)

## Properties

All dropdowns use the following interfaces:

* PopupProps

    See Popup specifications.

* Optionlist

    See SelectionList specifications.

Common Props (all dropdowns)

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| disabled | boolean | false | no | see HTML specs |
| autoFocus | boolean | false | no | see HTML specs |
| open | boolean | false | no | Whether the Popup is shown |
| openOnFocus | boolean | false | no | Whether the Popup opens automatically when focus is gained |
| onChange | (id: string) => void | NOP | no | Triggered when an item is selected in the list |
| hideSelected | boolean | false | no | Hides selected values so that they do not appear in the selection list |
| children | any | null | no | Children to be rendered in the list, see SelectionList for further details |

* Dropdown Props

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| value | string | null | no | id of the selected item |

* AutoComplete Props

The AutoComplete is an extension of an input field of type text, thereby expanding its props.

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| allowFreeText | boolean | true | no | Allows user to enter text which does not appear in the suggestion list |
| showNoSuggestions | boolean | false | no | Shows a message when there are no suggestions to show a user |
| noSuggestionsNotice | string \| func | "No Results" | no | Message to show in popup when there are no suggestions for the user. If function used then it renders an element in the popup |
| selected | string | null | no | id of the selected item |
| filter | func | prefix search function | no | Function used to filter results according to input |
| minCharacters | number | 0 | no | Number of characters required in input before suggestions appear |
| maxSearchResults | number | 0 (unlimited) | Maximum number of results to show for a filter match |

* MultiSelect Props

Supports AutoComplete props as well as the native text input props.

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| selected | Array<String> | empty | no | list of selected ids |
| maxSelected | number | 0 (unlimited) | no | number of selections allowed |

## Styles

See SelectionList for further styles. The following are relevant for all DropDown and AutoComplete:

| Name | Description |
| -- | -- |
| input | The dropdown input container |
| toggle | The toggle used in the input container |

Styles for MultiSelect:

| Name | Description |
| -- | -- |
| input | The dropdown input container |
| clear | The 'x' that clears tha input container |
| tag | The tag box inside the input container |
| tagDelete | The 'x' that deletes a specific tag |

### States

| Name | Description |
| -- | -- |
| active | self explanatory |
| focus | self explanatory |
| disabled | self explanatory |
| readonly | Relevant for AutoComplete and MultiSelect |
| hover | self explanatory |

## Accessibility

### DropDown

#### Roles
* Root role - combobox

#### Aria Attributes
* User provided props: aria-label, aria-labelledby, aria-describedby
* Children aria roles will be in the SelectionList specs

#### Focus

On <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">TAB</kbd> the dropdown gets focus.

## Behavior

### Keyboard Navigation

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Space</kbd> -> opens/closes dropdown
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Enter</kbd> -> Opens/closes the dropdown
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Esc</kbd> -> Closes dropdown if opened
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Down</kbd> -> Opens popup if currently closed
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Up</kbd> -> When on first element of popup, closes popup

Additional in AutoComplete:

* number/string input -> Causes the dropdown to open if results are found or if the showNoSuggestions flag is used.

Additional in MultiSelect:

* 'Backspace' key -> Deletes tag when cursor is after it.

### Mouse Handling

* Click outside - closes dropdown
* Click on element - sets selection

Additional in MultiSelect:

* Click on clear icon on tag -> removes value from selection
* Click on clear icon for component -> removes all selected items

### Touch Handling

* Tap outside - closes dropdown
* Tap on element - sets selection

Additional in MultiSelect:

* Tap on clear icon on tag -> removes value from selection
* Tap on clear icon for component -> removes all selected items

## Examples

TBD

## Design

See in [zeplin](https://app.zeplin.io/project/590ed391cb8bde641789e1cb/screen/5964cdbfd24b9b50926c8ed0).
