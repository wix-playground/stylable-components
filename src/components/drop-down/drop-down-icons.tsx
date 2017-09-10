import * as React from 'react';

export const CaretDown: React.SFC<React.HTMLAttributes<SVGElement>> = props => {
    return (
        <svg
             xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             {...props}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
};
