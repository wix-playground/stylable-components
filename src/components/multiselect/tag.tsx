import React = require('react');
import {stylable} from 'wix-react-tools';
import {noop} from '../../utils';
import style from './tag.st.css';

export interface Props {
    id: any;
    onDelete: (id: any) => void;
}

@stylable(style)
export class Tag extends React.Component<Props> {
    public static defaultProps = {onDelete: noop};

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

    protected handlDeleteClick = () => this.props.onDelete(this.props.id);
}
