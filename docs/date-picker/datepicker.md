# DatePicker Components Specification

* [Description](#description)
* [Elements](#elements)
* [Properties](#properties)
* [Styles](#styles)
* [Accessibility](#accessibility)
* [Behavior](#behavior)
* [Examples](#examples)
* [Design](#design)

## Description
A date picker allows users to select dates by using an input or a popup calendar.

## Elements
 * Input Component with Icon Component

 UI Presentation of input with icon

![Image of basic date picker](./assets/datepicker/DatePickerBasicInput.png)

* Calendar View for selecting dates


UI presentation of calendar view behaviors:

* *Nothing selected or focused*

![Image of calendar view 1](./assets/datepicker/CalendarView-nothing.png)

* *Same date selected and focused*

![Image of calendar view 2](./assets/datepicker/CalendarView-SameSelectedFocused.png)

* *Current day focused, not selected*

![Image of calendar view 3](./assets/datepicker/CalendarView-SameSelectedCurrentFocus.png)

* *Selected and focused on different days* - 18th selected, 20th focused

![Image of calendar view 4](./assets/datepicker/CalendarView-SelectedFocusedDifferent.png)

* *Selected, focused and current on different days* - 18th selected, 20th current day, 11th focused

![Image of calendar view 5](./assets/datepicker/CalendarView-SelectedCurrentFocusedDifferent.png)

* *Changing the first day of the week* - In this example the first day of the week is set to Monday.

![Image of calendar view 6](./assets/datepicker/CalendarView-firstdayofweek.png)

* *Show prev/next days* - the days are not clickable, just shown and considered disabled

![Image of calendar view 7](./assets/datepicker/CalendarViewPrevNext.png)

* *Disable Weekends* - the days are not clickable, just shown and considered disabled

![Image of calendar view 8](./assets/datepicker/CalendarViewDisabledWeekends.png)

* *Disable specific dates* - the days are not clickable, just shown and considered disabled

![Image of calendar view 9](./assets/datepicker/CalendarView-DisableSpecificDates.png)

* *Calendar View open - Align Bottom Left*

![Image of calendar view 10](./assets/datepicker/CalendarView-OpenBL.png)

* *Calendar View open - Align Bottom Right*

![Image of calendar view 11](./assets/datepicker/CalendarView-OpenBR.png)

* *Calendar View open - Align Top Left*

![Image of calendar view 12](./assets/datepicker/CalendarView-OpenTL.png)

* *Calendar View open -Align Top Right*

![Image of calendar view 13](./assets/datepicker/CalendarView-OpenTR.png)

## Properties

DatePicker extends formInputProps

| Name | Type | Default| Required | Description |
| --- | --- | --- | --- | --- |
| openOnFocus | boolean | false | no | Whether the Calendar View is opened when the input component gains focus. |
| inputPlaceholder | string | empty string | no |Placeholder text for the input |
| firstDayOfWeek | number | Defaults to 0 (Sunday), accepts 0 - 6 | no | define starting day of the week |
| minDate | ISO 8601 date | empty date | no | Used to set the minimal date shown in the Calendar View and accepted in the input |
| maxDate | ISO 8601 date | empty date | no | Used to set the maximum date shown in the Calendar View and accepted in the input |
| inputFormat | string | browser implementation of javascript date object constructor | no | The format used to parse the input | 
| disabledDates | Array [ISO 8601 date] | empty array | | List of ISO 8601 dates that are disabled (cannot be selected) in the Calendar View |
| disableWeekends | boolean | false | no | Weekends cannot be selected in the Calendar View |
| weekendDays | number | 1 | no |Defaults to [0,6], list of days set as weekend |
| locale | string | user agent locale | no | Locale
| dayLabels | Array[{String, String}] | english weekdays | no | Default in English, user may enter arrays of labels where each label has a regular and shortened version (maybe can be done with code, in which case we change implementation - R&D)|
| monthLabels | Array[{String, String}] | english month names with regular and three letter versions| no | Default in English, user may enter arrays of labels where each label has a regular and shortened version (maybe can be done with code, in which case we change implementation- R&D)|
| showPrevNextDays | boolean | true | no | Defaults to false, in the calendar month show previous and next days. |

## Styles

### Subcomponents (psuedo elemnts)
| Name | Description | Inner States |
| --- | --- | --- |
| input | Used for the input component | error, focus, hover, disabled |
| icon| Used for the icon component | focus | 
| calendarTitle | For changing the look of the month/year title | hover, focus |
| calendarView | Used for the Calendar View ||
| fullYearView | Used in full year view (time range extension) | |
| decadeView | Used in decade view (time range extension) | |
| dateItem | A date in a calendar | selected, hover, focus, today, disabled |

### States
| Name | Description |
| --- | --- |
| -- | -- |


## Elements
* Input with Calendar Icon
* Calendar
* Expand Scope button


## Accessibility

### Role

* Root role - *combobox*
* Input element role - *textbox*
* Calendar role - *group*
* Each day label has the role *columnheader*
* Each day cell has the role *gridcell*

### Aria Attributes

* aria-expanded=true if the popup is open, otherwise aria-expanded=false. Placed on the root element.
* aria-haspopup=true on the root element
* aria-live=assertive on the section encompassing the header date. This means that when the month is changed, the assistive technology will proclaim the new month/year combination to the the user.
* grid should be labelled
* aria-label, aria-describedby, aria-labelledby copied to the root element
* aria-selected=true is placed on the day selected by the user.
* Inside the calendar, each day is required to have an aria-label which includes the day of the week, and specific date. The label should be constructed according to the locale format including this information.

A calendar view aria example:

```html
<div class="dropdown" role="group">
	<div class="header">
		<span class="arrowWrapper arrowWrapperPrev">
			<i class="headerArrow headerArrowPrev"></i>
		</span>
		<span class="headerDate" aria-live="assertive">
			<span data-automation-id="MONTH_NAME">August</span>
			<span data-automation-id="YEAR">2017</span>
		</span>
		<span class="arrowWrapper arrowWrapperNext">
			<i class="headerArrow headerArrowNext"></i>
		</span>
	</div>
	<div role="grid" class="calendar">
        <span role="row">
            <span role="columnheader">Sun</span>
            <span role="columnheader">Mon</span>
            <span role="columnheader">Tue</span>
            <span role="columnheader">Wed</span>
            <span role="columnheader">Thu</span>
            <span role="columnheader">Fri</span>
            <span role="columnheader">Sat</span>
        </span>
        <span role="row">
            <span role="gridcell" data--inactive="true" aria-label="Sunday, 30 July 2017">30</span>
            <span role="gridcell" data--inactive="true" aria-label="Monday, 31 July 2017">31</span>
            <span role="gridcell" data-automation-id=" DAY_1" aria-label="Tuesday, 1 August 2017">1</span>
            <span role="gridcell" data-automation-id=" DAY_2" aria-label="Wednesday, 2 August 2017">2</span>
            <span role="gridcell" data-automation-id=" DAY_3" aria-label="Thursday, 3 August 2017">3</span>
            <span role="gridcell" data-automation-id=" DAY_4" aria-label="Friday, 4 August 2017">4</span>
            <span role="gridcell" data-automation-id=" DAY_4" aria-label="Saturday, 5 August 2017">5</span>
        </span>
        ...
            <span role="gridcell" data-automation-id=" DAY_30">30</span>
            <span role="gridcell" data-automation-id=" DAY_31">31</span>
            <span role="gridcell" data--inactive="true">1</span>
            <span role="gridcell" data--inactive="true">2</span>
        </span>
	</div>
</div>
```

### Focus

The DatePicker manages 2 focus states, one for the input element, the *real* focus, and one in the calendar view (seen through CSS highlighting). When the popup is opened, it gains focus and grabs the right and left arrow events from the input element. Numbers entered in the input are written there in the location the caret was when the pop was opened.

## Behavior

### Keyboard Navigation

* alt + <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">down</kbd> -> Opens the popup
* alt + <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">up</kbd> -> Closes the popup (when opened of course)
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">left</kbd> -> Moves the caret to the left (when the popup is closed)
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">right</kbd> -> Moves the caret to the right (when the popup is closed)
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">Esc</kbd> -> Closes dropdown if opened. Focus returns to the input container.

Input handling inside the calendar:

* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">down</kbd> -> Focus goes to the same day of the week in the previous week (switches to previous month when relevant). If date is disabled, then focus moves to a week before. If no valid date is found, then focus does not change.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">up</kbd> -> Focus goes to the same day of the week in the next week (switches to previous month when relevant). If date is disabled, then focus moves to a week before. If no valid date is found, then focus does not change.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">left</kbd> -> Focus goes to the previous day (switches to previous month when relevant). If date is disabled, then focus moves to a day before. If no valid date is found, then focus does not change.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">right</kbd> -> Focus goes to the next day (switches to next month when relevant). If date is disabled, then focus moves to a day after. If no valid date is found, then focus does not change.
* ctrl + <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">left</kbd> -> Focus goes to the same day in the previous month. If date is disabled, then focus moves to a day before. If no valid date is found, then focus does not change.
* ctrl + <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">right</kbd> -> Focus goes to the same day in the next month. If date is disabled, then focus moves to a day after. If no valid date is found, then focus does not change.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">home</kbd> -> Focus goes to the first non-disabled day in the month
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">end</kbd> -> Focus goes to the last non-disabled day in the month.
* <kbd style="display: inline-block; padding: .1em .3em; color: #555; vertical-align: middle; background-color: #fcfcfc; border: solid 1px #ccc;border-bottom-color: #bbb;border-radius: .2em;box-shadow: inset 0 -1px 0 #bbb;">enter</kbd> -> Selects the highlighted date. Popup closes after selection.

### Mouse Handling

* Popup does not close when user right-clicks on it!
* Mouse click selects the focused date in the calendar view (popup closes after selection)
* Mouse click opens/closes the popup when done on the widget (and only on the widget)
* Mouse click on the input element moves the caret to the clicked location.
* Mouse over the calendar banner reveals the Expand Scope button.
* Clicking on the expand scope button changes the calendar view to be based on month, year or decade.

### Touch Handling

* Tap selects the date touched (popup closes after selection)
* Tap opens/closes the popup when done on the widget (and only on the widget)
* Tap on the input element moves the caret to the touched location.


### Time Range Extension Dialogs

On mouse over the banner of calendar view, the year and month appear to be selectable desite not being so through keyboard navigation
When clicking on the banner calendar view changes to show all twelve months (full year view) instead of dates within a month and callendar view banner show only the year
Selecting a month from the display returns the view to be regular calendar view showing the dates of the selected month
Clicking on the banner displaying while in full year view changes it to display a the decade this year belongs to (decade view) the banner changes to display the the decade marked as XXX0-XXX9
Selecting a year from the display returns the view to be be full year view
Pressing on the banner displaying the decade shifts the view to show ten decade groupings (century view). The banner displays the century in the folloewing fashion XX00-XX99
Selecting a decade shifts the view to decade view

![Image of expanded calendar view](./assets/datepicker/CalendarViewExpandTimeScope.png)


## Examples
TBD

## Design 
See in [Zeplin](https://app.zeplin.io/project/5864e02695b5754a69f56150/screen/58b28d00efec796080acbd70)
=======

