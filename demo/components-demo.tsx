import * as React from 'react';
import { Link } from '../src';
import { Image } from '../src';
import { sampleImage } from '../test/fixtures/sample-image';
import {AutoForm} from "../src";
import {AutoFormSchema, SchemaRepository} from "../src";
const style = require('./style.css');
import {Provider} from 'mobx-react';

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
        return (
            <Provider>
                <div>
                    <h1>{'<Link />'}</h1>
                    <Link className={style.test} href="">My link</Link>
                    <h1>{'<Image />'}</h1>
                    <Image src={sampleImage} />
                    <h1>{'<AutoForm />'}</h1>
                    <AutoForm repo={this.schemaRepository} schemaId="demo schema"/>
                </div>
            </Provider>
        );
    }
}
