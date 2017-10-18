import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {setGlobalConfig, stylable} from 'wix-react-tools';
import {ComponentsDemo} from './components-demo';
import styles from './style-wix.st.css';

setGlobalConfig({devMode: true});

@stylable(styles)
class Demo extends ComponentsDemo {}

const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1';
document.head.appendChild(meta);

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
ReactDOM.render(<Demo />, rootContainer);
