import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ComponentsDemo } from './components-demo';

const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1';
document.head.appendChild(meta);

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
ReactDOM.render(<ComponentsDemo />, rootContainer);
