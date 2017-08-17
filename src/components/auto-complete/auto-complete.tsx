import * as React from 'react';
import { OptionList } from '../selection-list/selection-list';
import { SBComponent } from 'stylable-react-component/dist/stylable-react';
import { root } from 'wix-react-tools';
import style from './auto-complete.st.css';

export interface AutoCompleteProps extends OptionList {
    value?: string;
    onChange?: (value: string) => void;
    style?: any;
    className?: string;
}

@SBComponent(style)
export class AutoComplete extends React.Component<AutoCompleteProps, {}> {

    public static defaultProps: AutoCompleteProps = { dataSource: [], onChange: () => {}, value: '' };

    public render() {
        const rootProps = root(this.props, {
            'data-automation-id': 'AUTO_COMPLETE',
            className: 'auto-complete',
        }) as React.HtmlHTMLAttributes<HTMLDivElement>;

        return (
            <div {...rootProps}>
                <input
                    data-automation-id="AUTO_COMPLETE_INPUT"
                    type="text"
                    onChange={this.onChange}
                    value={this.props.value}
                />
            </div>
        );
    }

    private onChange = (e: any) => {
        this.props.onChange!(e.target.value || '');
    };
}
