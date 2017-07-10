import * as React from 'react';
import { Link } from '../src';
import {AutoForm} from "../src";
import {AutoFormSchema, SchemaRepository} from "../src";
const style = require('./style.css');

export class ComponentsDemo extends React.Component<{}, {}>{
    schemaRepository: SchemaRepository;


    constructor() {
        super();
        this.schemaRepository = new SchemaRepository();
        this.schemaRepository.addSchema(
            {
                id:"demo schema",
                properties:{
                    "text":{
                        "type":"string",
                        "title":"a text field"
                    }
                } as any
            } as AutoFormSchema);
    }


    render() {
        return <div>
            <Link className={style.test} href="">My link</Link>

            <AutoForm repo={this.schemaRepository} schemaId="demo schema"/>
        </div>;
    }
}
