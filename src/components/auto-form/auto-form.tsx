import * as React from 'react';
import {TextInput} from "../text-input/text-input";


export interface AutoFormProps extends React.HTMLAttributes<HTMLFormElement> {
    repo:SchemaRepository,
    schemaId:string
}

export interface AutoFormSchema {
    id:string
    properties:{[key:string]:SchemaProperty}
}

export interface SchemaProperty {
    title: string;
}

export class SchemaRepository {
    schemas:{[key:string]:AutoFormSchema} = {};

    addSchema(schema:AutoFormSchema):void {
        this.schemas[schema.id] = schema
    }

    getSchema(id:string):AutoFormSchema {
        return this.schemas[id]
    }

    clear() {
        this.schemas = {}
    }
}

export function newSchemaRepository():SchemaRepository {
    return new SchemaRepository();
}

export class AutoForm extends React.Component<AutoFormProps, {}> {
    render() {
        let children = [];
        if (!this.props.repo) {
            children.push(<label data-automation-id="errMessage">can't render form - missing properties</label>);
        } else {
            let schemaProperties = this.props.repo.getSchema(this.props.schemaId).properties;
            children = Object.keys(schemaProperties).map((property)=> {
                return <div>
                        <label data-automation-id={`label_${property}`}>{schemaProperties[property].title}</label>
                        <TextInput data-automation-id={`input_${property}`}/>
                    </div>
            });
        }

        return <form {...this.props}>
                {children}
            </form>
    }
}
