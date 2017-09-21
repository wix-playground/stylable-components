## Circular Loader

**Circular Loader** is a component that rotates to show the progress of a task or that there is a wait for a task to complete.

Loader should be used when part of the page is waiting for asynchronous data or during a rendering process. Appropriate loading animation can effectively set users expectations & warn them about wait time.

**Types:**

1. <u>Indeterminate</u> - loading indicator animates continuously
2. <u>Determinate</u> - loading indicator adjusts to show the percentage complete, as a ratio of `value`: `max-min`

## Elements

![elements](./assets/elements.png)

**Circular Loader consists of:** 

1. ::progress -  
2. ::bar - 

## API

**Props**

See [README.md]() for more info.

**Style**

Brief description of pseudo-classes and custom CSS states that can be applied to the component. See [README.md]()for more info.

## States

| State      | Description                              |
| ---------- | ---------------------------------------- |
| :success   | Allows to style the component when loading was successful |
| :exception | Allows to style the component when loading process is terminated |

Design [assets]()



## Accessibility

Intro

##### Keyboard

> Specific cases related to keyboard behavior (if any)

##### Focus

> Describe focus behavior (e.g. different components can have different focus states)

##### Reference links

> Links to similar ARIA compatible components for reference

### Behavior

Description

#### Validation

#### Edge case handling

| Case | Handling |
| ---- | -------- |
|      |          |

## Input Methods

There is no handling for Keyboard, Mouse or Touch

## RTL

> We are deciding on how are we going to handle the RTL. Detailed description will be added later.

## DOM structure

Each component should have a visual style guide for all of its visual states and elements structure. This style guide will be based on the **Style API**, and a visual theme agreed upon as our reset style (Wix style).

If more themes exist, they should be shown as well, and available as options through change of theme.

In addition, a link to Zeplin or a similar system is optional.

## Design

Link to [assets](link goes here)