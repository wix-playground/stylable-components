## Accessibility

### Introduction

Implementing accessibility for components requires the following:
1) **WAI-ARIA role**: a role markup attribute which sets the type of the component (i.e. menu, slider, button, search). See [Roles Categorization](https://www.w3.org/TR/wai-aria-1.1/#roles_categorization) for a full listing. Some roles can be achieved automatically by using HTML5 sectioning elements (such as nav).
2) **WAI-ARIA state & property**: aria prefixed markup attribute which sets the state of a component (i.e. "aria-checked" for a checkbox) or a property of it (i.e. aria-label). When combined with a role, it helps the assistive technology convey information to the user. Note that the difference between a state and property is semantic when considering the code implementation - states usually change a lot while properties do not. See [States & Properties](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) for a full listing.
4) **Implementing keyboard support**: a set of pre-defined keys implemented for the component.
5) **Focus**: in order for an interactive component to be supported by assistive technologies, its ability to gain focus is inherent. It is important for a composite component (i.e. dropdown, radio group) to gain focus only through tab and not to have the tab key used in order to navigate within the component. See [Keyboard navigation inside components](https://www.w3.org/TR/wai-aria-practices/#kbd_general_within) for an explanation on the correct use of tabindex in composite components.

### Associating text content with a component

For interactive components, components with landmark roles and components with widget roles (see [explanation](https://www.paciellogroup.com/blog/2017/07/short-note-on-aria-label-aria-labelledby-and-aria-describedby/)), text content can be associated using the
aria-label, aria-labelledby, and aria-describedby attributes.

### How to implement

* Read the documentation for the component on <a href="https://www.w3.org/TR/wai-aria-practices/" target="_blank">WAI-ARIA Practices</a>. Write your code according to the documentation, verifying that you have indeed implemented the five requirements listed in the introduction section above (if applicable).
* When a component is not listed in the w3 draft, implement accessibility traits according to a similar component.
* There is no need to implement a corresponding hidden native HTML element in a component when correctly implementing accessibility.
* Supported aria attributes should be added to the component interface props and copied to the root element. The three text content attributes are probably relevant to all components we are using. Any other aria attributes not **implicitly** supported should not be copied and the component should probably issue a warning about that.

## Controlled component

We follow the pattern of [controlled components.](https://facebook.github.io/react/docs/forms.html#controlled-components)
It is considered best-practise, as it provides clean and simple guidelines and integrates well
with forms and form validation patterns. We are aware of the shortcomings (especially the fact
that if the component is not bound to some kind of parent state, it seems to be "not working".)
and a generic solution for automagical "uncontrolled" use is under development.
