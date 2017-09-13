import * as React from 'react';
import {properties, stylable} from 'wix-react-tools';

export const CalendarIcon: React.SFC = props => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            viewBox="0 0 16 16"
            {...props}
        >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-459.000000, -443.000000)" fill="#3899EC">
                    <g transform="translate(183.000000, 189.000000)">
                        <g>
                            <g transform="translate(264.000000, 88.000000)">
                                <g transform="translate(0.000000, 126.000000)">
                                    <path
                                        d={`M24,40 L24,41 L16,41 L16,40 L15,40` +
                                        `L15,41 L13,41 L13,42 L15,42 L15,43 L16,43` +
                                        `L16,42 L24,42 L24,43 L25,43 L25,42 L27,42` +
                                        `L27,45 L13,45 L13,42 L12,42 L12,54.9999375` +
                                        `L13,54.9999375 L13,46 L27,46 L27,54.9999375` +
                                        `L28,54.9999375 L28,42 L27.0000625,42 L27.000` +
                                        `0625,41 L25,41 L25,40 L24,40 Z M13,56 L27.00` +
                                        `00625,56 L27.0000625,55 L13,55 L13,56 Z`}
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
