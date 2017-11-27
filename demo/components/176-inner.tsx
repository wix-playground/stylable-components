import * as React from 'react';
import {stylable} from 'wix-react-tools';
import inner from './176-inner.st.css';

export const Inner = stylable(inner)(
    (props: React.HTMLAttributes<HTMLDivElement>) =>
        <div {...props}><div className="part">Inner</div></div>
);
