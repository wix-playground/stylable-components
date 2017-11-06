# MultiSelect Components Specification

* [Description](#description)
* [Elements](#elements)
* [Properties](#properties)
* [Styles](#styles)
* [Accessibility](#accessibility)
* [Behavior](#behavior)
* [Examples](#examples)
* [Design](#design)

## Description

Part of the selectionList family. The text input area of MultiSelect can hold several different values simultaneously. 

## Elements

![Image of dropdown elements](./assets/multi-select/MultiSelectElements.png)

## Properties

All dropdowns use the following interfaces:


* [Selectionlist component properties](../selectionlist/selectionlist.md)

* [Dropdown component properties](../dropdown/dropdowns.md)

* [Autocomplete component properties](../autocomplete/autocomplete.md)

* MultiSelect Props

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| value | `Array<String>` | empty | no | list of selected values |
| maxSelected | number | 0 (unlimited) | no | number of selections allowed |

## Styles

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
| readonly | self explanatory |
| hover | self explanatory |

## Accessibility

#### Roles

* Root role - *combobox*
* Input role - *textbox*
* Clear all icon role - *button*, tag delete icons should not be accessible, so verify no active role is used or HTML element which suggests action.

#### Aria Attributes

* aria-expanded=true if the popup is open, otherwise aria-expanded=false. Placed on the root element.
* aria-haspopup=true on the root element
* User provided props: aria-label, aria-labelledby, aria-describedby copied to root
* aria-autocomplete=list on the input element (the one with the *textbox* role)
* aria-multiselectable=true on the SelectionList
* aria-selected=true on the option selected in the SelectionList, **all** other options should have aria-selected=false.

#### Focus

Same as AutoComplete. The tag elements are **not** focusable through keyboard navigation, the reason being it makes accessibility ridiculously difficult for the users.

## Behavior

### Keyboard Navigation

Studied examples from [React Widgets](http://jquense.github.io/react-widgets/docs/#/dropdownlist?_k=p7z1pg) and [Kendo](http://demos.telerik.com/kendo-ui/dropdownlist/keyboard-navigation) which exhibit excellent accessibility features and are comparable to the w3 specs. If the details below are not clear, look at these examples to verify you understand the required behavior.

#### MultiSelect

Studied examples from [React Widgets](http://jquense.github.io/react-widgets/docs/#/dropdownlist?_k=p7z1pg) and [Kendo](http://demos.telerik.com/kendo-ui/dropdownlist/keyboard-navigation) which exhibit excellent accessibility features and are comparable to the w3 specs. If the details below are not clear, look at these examples to verify you understand the required behavior.

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">alt</kbd> + <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">down</kbd> -> Opens the popup
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">alt</kbd> + <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">up</kbd> -> Closes the popup (when opened of course)
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">down</kbd> -> When the popup is closed changes selection to the next item in the list. If the current selected item is not valid, the first item in the list is selected.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">up</kbd> -> When the popup is closed changes selection to the previous item in the list if there is a valid selected item. If there is no valid selection (the input container being empty is such a case) then nothing happens.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">left</kbd> -> Moves the caret to the left
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">right</kbd> -> Moves the caret to the right
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Esc</kbd> -> Closes dropdown if opened. Focus is only in the input container.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Home</kbd> -> When the popup is open, selects the first item in the SelectionList
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">End</kbd> -> When the popup is open selects the last item in the SelectionList
* Any other characters are entered in the input element, filtering the list of available options or showing the no suggestions element when relevant (see autocomplete focus section for details).

The following behaviors are implemented in the SelectionList (relevant when a popup is opened and focus is in the SelectionList:
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Backspace</kbd> -> If there is content in the input it deletes characters. If there is no content in the input it deletes tag when cursor is after it.

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Enter</kbd> -> Changes the selection state of the highlighted item

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Tab</kbd> -> Moves focus to the next component and closes the popup.


### Mouse Handling

* Click outside:
  * When popup is closed, focus is lost
  * When popup is opened, focus is lost and popup is closed
* Click on toggle opens the popup
* Click on an option (SelectionList) - option is selected and popup is closed
* Click on clear icon on tag -> removes value from selection
* Click on clear icon for component -> removes all selected items

### Touch Handling

Same as click behavior, apart from touchdown behavior.

* Tap on clear icon on tag -> removes value from selection
* Tap on clear icon for component -> removes all selected items

## Examples

TBD

## Design

See in [zeplin](https://app.zeplin.io/project/590ed391cb8bde641789e1cb/screen/5964cdbfd24b9b50926c8ed0).

