## Material UI

git - [https://github.com/callemall/material-ui](https://github.com/callemall/material-ui)

storybook - [http://www.material-ui.com/#/components/slider](http://www.material-ui.com/#/components/slider)

styleguide - [https://material.io/guidelines/components/sliders.html](https://material.io/guidelines/components/sliders.html)



##### PROS

**General:**

1. Best documentation (git, storybook, styleguides)

2. They have [example projects](https://github.com/callemall/material-ui/tree/master/examples)

3. Ability to implement custom / logorythmic scale

   ​

**Properties:**

~ Nice use of **"axis"** prop that controlls slider position (horizontal / vertical) & direction (slides from left to right and vive versa) -> imho this is more flexible than "RTL" prop



**Styles & Theme:**

1. Ability to override the inline style of the root element with "style" object
2. Predefined themes (light / dark) that are shipped with the [library](http://www.material-ui.com/#/customization/themes).
3. Ability to customize theme
4. Use basic theme on custom component



## Wix Style React

storybook - [https://wix.github.io/wix-style-react/?selectedKind=Core&selectedStory=Slider&full=0&down=0&left=1&panelRight=0](https://wix.github.io/wix-style-react/?selectedKind=Core&selectedStory=Slider&full=0&down=0&left=1&panelRight=0)



##### PROS

**General:**

1. Simple & straightforward  component
2. Ability to have multiple handles (3+)

**Properties:**

1. "allowCross" - allow / forbade handles to cross
2. "displayMarks" - display / hide scale marks



##### CONS

1. Limited customization / styling capabilities
2. Bad RTL support (rtl basically pust slider on the right side but does not change the actual direcion of a slider - user still slides from left to right to increase value)



## React Slider

git -** **[https://github.com/react-component/slider](https://github.com/react-component/slider)

sample - [http://react-component.github.io/slider/examples/slider.html](http://react-component.github.io/slider/examples/slider.html)



##### PROS

**Properties:**

~ "className" allows to style elements DOM. This simplifies styling flow.

~ "marks"  intuitive prop with ability to style specific mark ([http://joxi.ru/12MlKndH408P5m](http://joxi.ru/12MlKndH408P5m)).

~ "dots" - ability to render slider with dots..

~ Style props that allow to style particular slider element (handleStyle, trackStyle, railStyle, dotStyle, activeDotStyle)

~ Allow pushing of surrounding handles when moving a handle. When set to a number, the number will be the minimum ensured distance between handles.



## WhoIsAndy

git - [https://github.com/whoisandy/react-rangeslider](https://github.com/whoisandy/react-rangeslider)

storybook -** **[https://whoisandy.github.io/react-rangeslider/](https://whoisandy.github.io/react-rangeslider/)



**General:**
Pretty basic slider component. Nothing to specific to mention here.



## Mpowaga

git -** **[https://github.com/mpowaga/react-slider](https://github.com/mpowaga/react-slider)

storybook - [https://mpowaga.github.io/react-slider/](https://mpowaga.github.io/react-slider/)



##### PROS

**Properties:**

~ "minDistance" - the minimal distance between any pair of handles. Zero means they can sit on top of each other.

##### CONS

**General**

~ Alpha release



## Seiyria

git - [https://github.com/seiyria/bootstrap-slider](https://github.com/seiyria/bootstrap-slider)

storybook -** **[http://seiyria.com/bootstrap-slider/](http://seiyria.com/bootstrap-slider/)



**General:**
Pretty basic slider component. Nothing to specific to mention here.
