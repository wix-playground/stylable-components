import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {setGlobalConfig, stylable} from 'wix-react-tools';
import {ComponentsDemo} from './components-demo';
import wixTheme from './styles/wix.st.css';
import defaultTheme from './styles/default.st.css';

const themes = require
    .context('./styles', true, /\.st.css/)
    .keys()
    .reduce((obj, fileName) => {
        console.log(fileName)
        const key = fileName.match(/(\w+)\.st\.css/)[1];
        obj[key] = import('./styles/wix.st.css');

        return obj;
    }, {})

console.log(themes);
/*
const context = require.context('./styles', true, /\.st.css/)
const themes = context
    .keys()
    .reduce((obj, fileName) => {
        console.log(fileName)
        const key = fileName.match(/(\w+)\.st\.css/)[1];
        const path = './styles/' + key + '.st.css';
        console.log(path);
        obj[key] = context('./' + key + '.st.css').default;

        return obj;
    }, {})
*/
//const themes: any = {wix: wixTheme, default: defaultTheme};
const themeName = window.location.search.match(/theme=(\w+)/) && RegExp.$1;
const theme = themeName && themes[themeName] || themes.default;

setGlobalConfig({devMode: true});

@stylable(theme)
class Demo extends ComponentsDemo {}

const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1';
document.head.appendChild(meta);

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);
ReactDOM.render(<Demo />, rootContainer);
