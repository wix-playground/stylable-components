import * as React from 'react';

export const CalendarIcon: React.SFC<React.HTMLAttributes<SVGElement>> = props => {
    return (
        <svg
             xmlns="http://www.w3.org/2000/svg"
             focusable="false"
             viewBox="0 0 24 24"
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
