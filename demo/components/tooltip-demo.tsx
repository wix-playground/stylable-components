import * as React from 'react';
import {stylable} from 'wix-react-tools';
import {Button, Position, Tooltip} from '../../src';

import styles from './tooltip-demo.st.css';

const longText = `
    Star Wars is an American epic space opera media franchise, centered on a film
    series created by George Lucas. It depicts the adventures of various characters
    "a long time ago in a galaxy far, far away".  The franchise began in 1977 with
    the release of the film Star Wars (later subtitled Episode IV: A New Hope in 1981),
    [2][3] which became a worldwide pop culture phenomenon. It was followed by the successful sequels
    The Empire Strikes Back (1980) and Return of the Jedi (1983); these three films
    constitute the original Star Wars trilogy.  A prequel trilogy was released between 1999 and 2005,
    which received mixed reactions from both critics and fans.  A sequel trilogy began in 2015 with
    the release of Star Wars: The Force Awakens.  All seven films were nominated for Academy Awards
    (with wins going to the first two films) and have been commercial successes, with a combined box
    office revenue of over US$7.5 billion,[4] making Star Wars the third highest-grossing film series.
    [5] Spin-off films include the animated Star Wars: The Clone Wars (2008) and Rogue One (2016),
    the latter of which is the first in a planned series of anthology films.
`;

const samples = [
    {
        title: 'Hover to show, leave to hide',
        props: {
            children: 'I am tooltip!'
        },
        positions: ['top', 'left', 'right', 'bottom']
    },
    {
        title: 'Diagonal positions',
        props: {
            showTrigger: 'click',
            hideTrigger: 'click',
            children: 'I am tooltip!'
        },
        positions: [
            'topLeft', 'topRight', 'bottomLeft', 'bottomRight',
            'leftTop', 'leftBottom', 'rightTop', 'rightBottom'
        ]
    },
    {
        title: 'Click to show, click to hide',
        props: {
            showTrigger: 'click',
            hideTrigger: 'click',
            children: longText
        },
        positions: ['top', 'left', 'right', 'bottom']
    },
    {
        title: 'Show after 200ms and hide after 300ms',
        props: {
            showDelay: 200,
            hideDelay: 300,
            children: longText
        },
        positions: ['top', 'left', 'right', 'bottom']
    }
];

@stylable(styles)
export class TooltipDemo extends React.Component {
    public render() {
        return (
            <div>
                {samples.map((sample, i) =>
                    <div key={i}>
                        <h4>{sample.title}</h4>
                        {sample.positions.map((position: Position, j) =>
                            <div className="positionButton" key={j}>
                                <Button data-tooltip-for={'id' + i + j} children={position}/>
                                <Tooltip id={'id' + i + j} position={position} {...sample.props}/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
