import * as React from 'react';

export interface AutoFormProps extends React.HTMLAttributes<HTMLFormElement> {
//    schema:string
}

export class AutoForm extends React.Component<AutoFormProps, {}>{
    render() {
        return <form {...this.props}></form>
    }
}
