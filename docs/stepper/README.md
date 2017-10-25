# Stepper Component

**Stepper** is a component that allows the user to increase or decrease numeric values. **Stepper** is typically used as an auxiliary component for the **NumberInput** and **TimePicker** components.

## Elements

![elements](./assets/elements.png)

**Stepper** consists of `::up` and `::down` arrows that are used to increase or decrease the value respectively. 

## API

##### Component Props

| name        | type      | defaultValue | isRequired | description  |
| ----------- | --------- | ------------ | ---------- | ------------ |
| disableUp   | boolean   | false        | no         | Disables **up** arrow.    |
| disableDown | boolean   | false        | no         | Disables **down** arrow.  |
| dragStep    | number    | 10           | no         | Defines how many pixels the user drags the cursor on mousedown to fire the `onUp` and `onDown` functions. |
| onUp        | function |  | no  | Callback function that is fired on **step up** events: mouse click, Up Arrow Key, drag step. <br> `(modifiers: Modifiers): void;` <br> `Modifiers` altKey, ctrlKey, shiftKey |
| onDown      | function |  | no | Callback function that is fired on **step down** events: mouse click, Down Arrow Key, drag step. <br> `(modifiers: Modifiers): void;` <br> `Modifiers` altKey, ctrlKey, shiftKey |

### Code Examples

##### Example 1

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
)
```

## Style API

### Subcomponents (pseudo-elements)

| selector | description          |
| -------- | -------------------- |
| ::up     | Style the **up** arrow.   |
| ::down   | Style the **down** arrow. |

### Custom CSS States (pseudo-classes)

| selector                       | description                 |
| ------------------------------ | --------------------------- |
| :hover, :focus, :disabled, etc | Standard CSS pseudo classes. |

### Style Code Examples

> TBD