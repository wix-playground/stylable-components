import * as React from 'react';
import { Link } from '../src';
import { Image } from '../src';
import { sampleImage } from '../test/fixtures/sample-image';
const style = require('./style.css');
import {Provider} from 'mobx-react';

export class ComponentsDemo extends React.Component<{}, {}>{
    render() {
        return (
            <Provider>
                <div>
                    <h1>{'<Link />'} </h1>
                    <Link className={style.test} href="">My link</Link>
                    <h1>{'<Image />'} </h1>
                    <Image src={sampleImage} />
                </div>
            </Provider>
        );
    }
}
