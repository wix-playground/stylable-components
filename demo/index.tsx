import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ComponentsDemo } from './components-demo';
import { useStrict } from 'mobx';

useStrict(true);

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
ReactDOM.render(<ComponentsDemo />, rootContainer);
