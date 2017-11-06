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

The dropdown is part of Selection List family of components and incorporates popup elements.

## Elements

![Image of dropdown elements](./assets/dropdowns/DropdownElements.png)

## Properties

All dropdowns use the following interfaces:

* [Popup Component Properties](../popup/popup.md)

* [SelectionList Component Properties](../selectionlist/selectionlist.md)

Dropdown properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| disabled | boolean | false | no | see HTML specs |
| autoFocus | boolean | false | no | see HTML specs |
| open | boolean | false | no | Whether the Popup is shown |
| openOnFocus | boolean | false | no | Whether the Popup opens automatically when focus is gained |
| onChange | (event: {value: string}): void | NOP | no | Triggered when an item is selected in the list |
| hideSelected | boolean | false | no | Hides selected values so that they do not appear in the selection list |
| children | any | null | no | Children to be rendered in the list, see SelectionList for further details |
| value | string | null | no | id of the selected item |


## Styles

See [SelectionList](../selectionlist/selectionlist.md) for further styles.

| Name | Description |
| -- | -- |
| input | The dropdown input container |
| toggle | The toggle used in the input container |
| toggleIcon | URL for the icon |

### States

| Name | Description |
| -- | -- |
| active | self explanatory |
| focus | self explanatory |
| disabled | self explanatory |
| readonly | Relevant for AutoComplete and MultiSelect |
| hover | self explanatory |

## Accessibility

Based on the old w3 [spec](https://rawgit.com/w3c/aria-practices/master/aria-practices-DeletedSectionsArchive.html#autocomplete).

#### Roles
* Root role - *combobox*
* Caret role - *button*
* SelectionList role - *listbox*, each item in the list having the role *option*

#### Aria Attributes
* aria-expanded=true if the popup is open, otherwise aria-expanded=false. Placed on the root element.
* aria-haspopup=true on the root element
* User provided props: aria-label, aria-labelledby, aria-describedby copied to root
* aria-selected=true on the option selected in the SelectionList

#### Focus
* Current focus implementation gives focus to the input container (which has tabindex=0) and controls focus between the input container and the list using js code. This means that it is not accessible. To be changed in the next version.
* Focus (for the purpose of handling keyboard navigation) can be either in the input container or in the selectionlist.
* The caret should **not** be in the tab order


## Behavior

### Keyboard Navigation

Studied examples from [React Widgets](http://jquense.github.io/react-widgets/docs/#/dropdownlist?_k=p7z1pg) and [Kendo](http://demos.telerik.com/kendo-ui/dropdownlist/keyboard-navigation) which exhibit excellent accessibility features and are comparable to the w3 specs. If the details below are not clear, look at these examples to verify you understand the required behavior.

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">alt</kbd> + <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">down</kbd> -> Opens the popup
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">alt</kbd> + <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">up</kbd> -> Closes the popup (when opened of course)
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">down</kbd> -> When the popup is closed changes selection to the next item in the list
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">right</kbd> -> When the popup is closed changes selection to the next item in the list
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">up</kbd> -> When the popup is closed changes selection to the previous item in the list
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">left</kbd> -> When the popup is closed changes selection to the previous item in the list
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Esc</kbd> -> Closes dropdown if opened. Focus returns to the input container.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Home</kbd> -> Selects the first item in the SelectionLis.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">End</kbd> -> Selects the last item in the SelectionList.
* Type-Ahead -> Changes the selection of the list. See SelectionList [spec](./selectionlist.md).

The following behaviors are implemented in the SelectionList (relevant when a popup is opened and focus is in the SelectionList:

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Home</kbd> -> highlights ths first item in the SelectionList
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">End</kbd> -> highlights the last item in the SelectionList
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Up</kbd> -> highlights previous item
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Down</kbd> -> highlights next item
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Space</kbd> -> Selects the highlighted option, closes the popup
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Enter</kbd> -> Selects the highlighted option, closes the popup.
* Type-Ahead -> Changes the highlighted item in the list. See SelectionList [spec](./selectionlist.md).
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Tab</kbd> -> Moves focus to the next focusable component and popup is closed.


### Mouse Handling

* Click outside:
  * When popup is closed, focus is lost
  * When popup is opened, focus is lost and popup is closed
* Click on the input container:
  * When popup is closed, opens the popup and:
    * If an element is selected, focus moves to that element
    * If no element is selected, focus moves to the first element
* Click on an option (SelectionList) - option is selected and popup is closed


### Touch Handling

Same as click behavior, apart from touchdown behavior which will be implemented in the next iteration.


## Examples

TBD

## Design

See in [zeplin](https://app.zeplin.io/project/590ed391cb8bde641789e1cb/screen/5964cdbfd24b9b50926c8ed0).
