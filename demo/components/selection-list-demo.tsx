import * as React from 'react';
import {SBComponent, SBStateless} from 'stylable-react-component';
import {divider, SelectionList} from '../../src/components/selection-list';
import demoStyle from './selection-list-demo.st.css';

export class SelectionListDemo extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <FoodList />
                <EmojiList />
                <TextStyleList />
            </div>
        );
    }
}

export class FoodList extends React.Component {
    public state = {value: 'Eggs'};

    private dataSource = [
        'Eggs',
        'Bacon',
        'Sausage',
        divider,
        'Ham',
        {value: 'Spam', label: 'Spam', disabled: true}
    ];

    public render() {
        return (
            <div data-automation-id="FOOD">
                <h3>Options from a data source</h3>
                <SelectionList
                    dataSource={this.dataSource}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <p data-automation-id="RESULT">
                    {this.state.value}, great choice!
                </p>
            </div>
        );
    }

    private onChange = (value: string) => this.setState({value});
}

@SBComponent(demoStyle)
class EmojiListItem extends React.Component<{
    'data-value'?: string;
    'data-selected'?: boolean;
    'data-focused'?: boolean;
}, {}> {
    public render() {
        return (
            <div
                className="item"
                data-value={this.props['data-value']}
                data-selected={this.props['data-selected']}
                data-focused={this.props['data-focused']}
            >
                {this.props.children}
            </div>
        );
    }
}

@SBComponent(demoStyle)
class EmojiList extends React.Component {
    public state = {value: 'Crocodile'};
    private dataSchema = {value: 'name', label: 'icon'};
    private dataSource = [
        {icon: '🐍', name: 'Snek'},
        {icon: '🐋', name: 'Whale'},
        {icon: '🐊', name: 'Crocodile'},
        {icon: '🐘', name: 'Elephant'},
        {icon: '🐇', name: 'Rabbit'},
        {icon: '🐝', name: 'Honeybee'}
    ];

    public render() {
        return (
            <div data-automation-id="EMOJI">
                <h3>Custom item renderer</h3>
                <SelectionList
                    className="emoji-list"
                    dataSchema={this.dataSchema}
                    dataSource={this.dataSource}
                    renderItem={this.renderItem}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <p data-automation-id="RESULT">
                    Your spirit animal is {this.state.value.toLowerCase()}.
                </p>
            </div>
        );
    }

    private renderItem = ({value, label}: {value: string, label: string}) => {
        return <EmojiListItem data-value={value}>{label}</EmojiListItem>;
    }

    private onChange = (value: string) => this.setState({value});
}

@SBComponent(demoStyle)
class TextStyleList extends React.Component {
    public state = {value: 'heading'};

    public render() {
        return (
            <div data-automation-id="TEXT_STYLE">
                <h3>Child components as options</h3>
                <SelectionList
                    className="text-style-list"
                    value={this.state.value}
                    onChange={this.onChange}
                >
                    <div className="item" data-value="title">
                        <span className="text-style-title">Title</span>
                    </div>
                    <div className="item" data-value="heading">
                        <span className="text-style-heading">Heading</span>
                    </div>
                    <div className="item" data-value="heading-red">
                        <span className="text-style-heading-red">Heading Red</span>
                    </div>
                    <div className="item" data-value="body">
                        <span className="text-style-body">Body</span>
                    </div>
                    <div className="item" data-value="caption" data-disabled>
                        <span className="text-style-caption">Caption</span>
                    </div>
                    <div className="item" data-value="label">
                        <span className="text-style-label">Label</span>
                    </div>
                </SelectionList>
                <p>
                    <span data-automation-id="RESULT" className={`text-style-${this.state.value}`}>
                        Styled text
                    </span>
                </p>
            </div>
        );
    }

    private onChange = (value: string) => this.setState({value});
}
