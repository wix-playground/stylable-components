# Stepper Component

Stepper is a component that allows users increase / decrease numeric values. Stepper is oftentimes going to be used as an auxiliary component for number input & time picker.



## Elements

![elements](./assets/elements.png)

**Stepper** consists of an `::up` and `::down` arrow buttons that are used to increase / decrease value respectively. 



## API

##### Component Props

| name        | type                            | defaultValue | isRequired | description                              |
| ----------- | ------------------------------- | ------------ | ---------- | ---------------------------------------- |
| disableUp   | bool                            | false        |            | Disables UP button.                      |
| disableDown | bool                            | false        |            | Disables DOWN button.                    |
| dragStep    | number                          | 10           |            | Defines how many pixels should a user drag the cursor on mousedown to fire `onUp` / `onDown` function. |
| onUp        | `(modifiers: Modifiers): void;` |              |            | Callback function that is fired on "mouse click", "Up Arrow Key" or "dragStep". <br>  **interface Modifiers** { <br>  altKey?: boolean; <br>   ctrlKey?: boolean; <br>  shiftKey?: boolean; <br>  } |
| onDown      | `(modifiers: Modifiers): void;` |              |            | Callback function that is fired on "mouse click", "Down Arrow Key" or "dragStep". <br>  **interface Modifiers** { <br>  altKey?: boolean; <br>   ctrlKey?: boolean; <br>  shiftKey?: boolean; <br>  } |



### Code Examples

#### **Example 1:**

```jsx
import {codes as KeyCodes} from 'keycode';
import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';
import {Modifiers, Stepper} from '../stepper';
	
return (
	<Stepper
		className="stepper"
      	data-automation-id="NUMBER_INPUT_STEPPER"
      	onUp={this.handleIncrement}
      	onDown={this.handleDecrement}
      	disableUp={disableIncrement}
      	disableDown={disableDecrement}
    />
```

Comments to example 1

**Example 2:**

```jsx
//TODO: code guys - fix code example!
```

Comments to example 2



## Style API

#### Subcomponents (pseudo-elements)

| selector | description          |
| -------- | -------------------- |
| ::up     | Style the UP arrow   |
| ::down   | Style the DOWN arrow |

#### Custom CSS States (pseudo-classes)

| selector                       | description                 |
| ------------------------------ | --------------------------- |
| :hover, :focus, :disabled, etc | Standard CSS pseudo classes |

### Style Code Examples

**Example 1:**

```css
/* Layout for default components style */
```

**Example 2:**

```css
/* Style the UP & DOWN arrow keys */
```