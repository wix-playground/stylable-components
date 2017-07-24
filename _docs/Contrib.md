* All components should implement the related native HTML component attributes if one exists
* All input components which are an implementation of an HTML component should have the native input element rendered by them (for SEO and a11y)

## Controlled component

We follow the pattern of [controlled components.](https://facebook.github.io/react/docs/forms.html#controlled-components)
It is considered best-practise, as it provides clean and simple guidelines and integrates well
with forms and form validation patterns. We are aware of the shortcomings (especially the fact
that if the component is not bound to some kind of parent state, it seems to be "not working".)
and a generic solution for automagical "uncontrolled" use is under development.
