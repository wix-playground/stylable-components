# Tooltip

Tooltip is a label (usually a text one) that appear when the user hovers over, focuses on, or touches an element.

Tooltips identify an element when they are activated. Usually used to display brief text description about its functionality. 

## Elements

![elements](./assets/elements.png)

**Position**

![position](./assets/position.png)

## API

**Props**

See [README.md](add link) for more info.

**Style**

Brief description of pseudo-classes and custom CSS states that can be applied to the component. See [README.md](add link)for more info.



## Accessibility

##### Keyboard

The tooltip element can be shown when user focuses over the anchor element with TAB key. 
Tooltip can be hidden when user removes focus from the anchor element with ESC key.

##### Focus

The tooltip itself never receives focus. Focus is placed over the anchor element which triggers the tooltip to be displayed. 



**Roles & Attributes**

| Role    | Attribute | Element | Usage                               |
| ------- | --------- | ------- | ----------------------------------- |
| tooltip |           | `div`   | Identifies the element as a tooltip |

### Behavior

Tooltip is shown on:

1. Hover
2. Focus
3. Touch



NOTES:

1. The tooltip widget can be shown via keyboard focus or by the onMouse, onTouch event.
2. The tooltip widget can be hidden by removing focus from the anchor element or by moving the mouse off it.
3. Escape key hides the tooltip (as it removes focus)



Tooltip should be able to automatically change its position on the screen to keep element visible for the user (e.g if the tooltip position is set to `top` but there is no space above the anchor element, tooltip should be displayed on the `bottom`. Same logic goes to `left` / `right`)



#### Validation

Default validation needs to be addressed, as well as the component behavior when validation is broken.

#### Edge case handling

| Case | Handling |
| ---- | -------- |
|      |          |

## Input Methods

#### Keyboard

| Keys | Action                                   |
| ---- | ---------------------------------------- |
| tab  | sets focus over the anchor element & displays the tooltip |
| esc  | removes focus from the element & hides the tooltip |
|      |                                          |
|      |                                          |

**RTL** ( if applicable )

| Keys | Action |
| ---- | ------ |
|      |        |

#### Mouse

| Event | Action                | NOTE                     |
| ----- | --------------------- | ------------------------ |
| hover | what happens on hover | Side notes (if relevant) |
| click |                       |                          |

#### **Touch**

| Event | Action              | NOTE                    |
| ----- | ------------------- | ----------------------- |
| tap   | what happens on tap | Side note (if relevant) |
| drag  |                     |                         |

## RTL

> We are deciding on how are we going to handle the RTL. Detailed description will be added later.

## Design

Link to [assets](link goes here)
