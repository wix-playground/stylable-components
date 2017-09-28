import React = require('react');
import {properties, stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import styles from './tag.st.css';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    id: any;
    onRequestDelete: (id: any) => void;
}

@stylable(styles)
@properties
export class Tag extends React.Component<Props> {
    public render() {
        return (
            <div>
                <div className="label">{this.props.children}</div>
                <svg className="delete" width="8" height="8" onClick={this.handlDeleteClick}>
                    <line x1="0" y1="0" x2="100%" y2="100%" />
                    <line x1="0" y1="100%" x2="100%" y2="0" />
                </svg>
            </div>
        );
    }

    protected handlDeleteClick = () => this.props.onRequestDelete(this.props.id);
}
