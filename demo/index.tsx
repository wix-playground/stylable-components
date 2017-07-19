import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ComponentsDemo} from './components-demo';

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
ReactDOM.render(<ComponentsDemo />, rootContainer);
