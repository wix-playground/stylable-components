## Accessibility

### Implementing Accessibility

* Read the documentation for the component in the spec. The spec will explain how to implement the following checklist for each component:

    1) **WAI-ARIA role**: A role gives assistive technologies information about how to handle the element. There are 2 ways to assign a role to a component:
        * Role markup attribute (i.e. role="button") on the root element which sets the type of the component. For a full listing of roles see [Roles Categorization](https://www.w3.org/TR/wai-aria-1.1/#roles_categorization).
        ```
        <div tabindex="0" role="button" id="action">Print Page</div>
        ```
        * HTML5 landmark region - A role can be achieved automatically without using the role attribute by using HTML5 section elements (such as nav, form). The assistive technology understands how to present this correctly to the user.
        ```
        <nav>
            <ol>
                <li>
                    <a>Authoring Practice</a>
                </li>
                <li>
                    <a>Cats</a>
                </li>
            </ol>
        </nav>
        ```
    2) **Aria-prefixed markup attribute**:  Used to set the state of a component (i.e. "aria-checked" for a checkbox) or a property of it (i.e. aria-label). Note that the difference between a state and property is semantic when considering the code implementation - states usually change a lot while properties do not. Most of the aria-prefixed attributes are set by the component and not by the user of the component. For a full listing see [States & Properties](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties).

        There are two types of aria-* attributes that need to be supported for a component:

        * User supplied attributes - are placed on a component by the developer who uses it in an application. All supported attributes need to be explicitly added in the props interface of the component (as optional).

            The current relevant attributes for all components are the text content attributes, used in interactive components, components with landmark roles and components with widget roles (see [explanation](https://www.paciellogroup.com/blog/2017/07/short-note-on-aria-label-aria-labelledby-and-aria-describedby/)). The attributes are aria-label, aria-labelledby, and aria-describedby. See example in next [section](#sample-implmentation).

        * Internal Implementation Attributes - are placed by the component code either on the root or on the relevant children in a composite component. Examples for these attributes are aria-autocomplete, aria-current, aria-checked and so on. The relevant attributes for a component will be added in the spec by the product manager. See example in next [section](#sample-implmentation).

    3) **Implementing keyboard support**: a set of keyboard behaviors implemented for key presses done when the component is in focus. For each component type, the w3 organization has provided clear instructions on how to correctly implement them. For components not in the draft, the Wix accessibility team will provide specific instructions.

        Check out the accordion [example](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html) in the draft.

    4) **Focus**: in order for an interactive component to be supported by assistive technologies, its ability to gain focus is crucial. It is important for a composite component (i.e. dropdown, radio group) to gain focus through tab and to explicitly set the tabindex on its children. See [Keyboard navigation inside components](https://www.w3.org/TR/wai-aria-practices/#kbd_general_within) for an explanation on the correct use of tabindex in composite components.

        The following shows the DOM representation of a custom Radio Group, which when gaining focus through tab, assigns the focus to the checked radio button:
    ```
    <div role="radiogroup" aria-labelledby="group_label_1" id="rg1">
        <div role="radio" aria-checked="true" tabindex="0">
            Regular crust
        </div>
        <div role="radio" aria-checked="false" tabindex="-1">
            Deep dish
        </div>
        <div role="radio" aria-checked="false" tabindex="-1">
            Thin crust
        </div>
     </div>
    ```

* Verify that you use the general a11y contract test and write specific tests per component.

    Note: There is no need to implement a corresponding hidden native HTML element in a component when correctly implementing accessibility.


### Sample Implementation

The following is a partial BreadCrumbs component to show accessibility implementation:

![Image of breadcrumbs](./sample_breadcrumbs.png)

```

// Sample Implementation

export interface BreadCrumbsProps {
    children?: any;
    className?: string;
    style?: string;
    ariaLabel?: string;         // user-supplied aria attribute
    ariaLabelledby?: string;    // user-supplied aria attribute
    ariaDescribedBy?: string;   // user-supplied aria attribute
}

export interface BreadCrumbProps {
    className?: string;
    style?: string;
    active?: boolean;
    label: string;
    onClick?: React.EventHandler<HTMLElement>;
}

export class BreadCrumbs extends React.Component<BreadCrumbsProps, {...}>{

    ...

    render(){
        <nav class="root" // navigation landmark region, no need to use role when we have this
             aria-label={this.props.ariaLabel ? this.props.ariaLabel : null}
             aria-labelledby={this.props.ariaLabelledby ? this.props.ariaLabelledby : null}
             aria-describedby={this.props.ariaDescribedBy ? this.props.ariaDescribedBy : null}
        >
            <ol>
                {this.props.children}
            </ol>
        </nav>
    }
}

const BreadCrumb: React.SFC<BreadCrumbProps> = ({label, active, style, className, onClick}) => {
    return (
        <li>
            <a aria-current={active ? 'page' : null}>{label}</a>
        </li>
    );
}

// Usage

<BreadCrumbs ariaLabel="My breadcrumbs" ariaDescribedby="My great breadcrumbs">
    <BreadCrumb onClick={() => console.log('first')} label="Authoring Practice" />
    <BreadCrumb onClick={() => console.log('second')} label="Cats" active={true} />
</BreadCrumbs>

// DOM

<nav class="root" aria-label="My breadcrumbs" aria-describedby="My great breadcrumbs">
    <ol>
        <li>
            <a>Authoring Practice</a>
        </li>
        <li>
            <a aria-current="page">Cats</a>
        </li>
    </ol>
</nav>

```

## Controlled component

We follow the pattern of [controlled components.](https://facebook.github.io/react/docs/forms.html#controlled-components)
It is considered best-practise, as it provides clean and simple guidelines and integrates well
with forms and form validation patterns. We are aware of the shortcomings (especially the fact
that if the component is not bound to some kind of parent state, it seems to be "not working".)
and a generic solution for automagical "uncontrolled" use is under development.
