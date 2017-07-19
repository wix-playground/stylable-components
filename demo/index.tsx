import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ComponentsDemo } from './components-demo';
import {Stylesheet} from 'stylable/react'

const rootContainer = document.createElement('div');
Stylesheet.context.attach()
document.body.appendChild(rootContainer);
ReactDOM.render(<ComponentsDemo />, rootContainer);
