import * as React from 'react';

export class Slottable<P, S, Slots extends string> extends React.Component<P, S> {
    slots: {
        [Slot in Slots]: React.ReactNode
    }
    props: Readonly<{children?: React.ReactNode}> & Readonly<P> & Readonly<{[Slot in Slots]: React.ReactNode}>
}
