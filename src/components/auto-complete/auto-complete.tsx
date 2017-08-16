import * as React from 'react';
import { SBComponent } from 'stylable-react-component/dist/stylable-react';
import { OptionList } from '../../../lib/components/selection-list/selection-list';
import style from './auto-complete.st.css';

export interface AutoCompleteProps extends OptionList {
    value?: string;
    // onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>> | undefined;
    onChange?: (value: string) => void;
    style?: any;
    className?: string;
}

@SBComponent(style)
export class AutoComplete extends React.Component<AutoCompleteProps, {}> {

    public static defaultProps: AutoCompleteProps = { dataSource: [], onChange: () => {}, value: '' };

    public render() {
        return (
            <div data-automation-id="AUTO_COMPLETE" className="auto-complete">
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
