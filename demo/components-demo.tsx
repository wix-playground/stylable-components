import * as React from 'react';
import { Link } from '../src';
import './style.css';

export class ComponentsDemo extends React.Component<{}, {}>{
    render() {
        return <div>
            <Link href="">My link</Link>
        </div>;
    }
}
