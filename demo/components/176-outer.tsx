import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {Inner} from './176-inner';
import outer from './176-outer.st.css';

export const Outer = stylable(outer)(
    () => <Inner className="inner" />
);
