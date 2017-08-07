import React = require('react');
import {SBComponent, SBStateless} from 'stylable-react-component';
import {divider, ItemRendererProps, SelectionList} from '../../src/components/selection-list';
import style from './selection-list-demo.st.css';

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
    public state = {value: 'Bacon'};

    private dataSource = [
        {value: 'Fasting', label: ''},
        divider,
        'Eggs',
        'Bacon',
        'Sausage',
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

interface EmojiListItemProps extends ItemRendererProps {
    item: {
        value: string;
        icon: string;
    };
}

const EmojiListItem: React.SFC<EmojiListItemProps> = SBStateless(props => {
    return (
        <div
            className="emoji-list-item"
            data-value={props.item.value}
            data-selected={props.selected || undefined}
        >
            {props.item.icon}
        </div>
    );
}, style);

@SBComponent(style)
class EmojiList extends React.Component {
    public state = {value: 'Crocodile'};

    private dataSchema = {value: 'name', icon: 'icon'};
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
                    itemRenderer={EmojiListItem}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <p data-automation-id="RESULT">
                    Your spirit animal is {this.state.value.toLowerCase()}.
                </p>
            </div>
        );
    }

    private onChange = (value: string) => this.setState({value});
}

@SBComponent(style)
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
                    <div data-value="title">
                        <span className="text-style-title">Title</span>
                    </div>
                    <div data-value="heading">
                        <span className="text-style-heading">Heading</span>
                    </div>
                    <div data-value="heading-red">
                        <span className="text-style-heading-red">Heading Red</span>
                    </div>
                    <div data-value="body">
                        <span className="text-style-body">Body</span>
                    </div>
                    <div data-value="caption">
                        <span className="text-style-caption">Caption</span>
                    </div>
                    <div data-value="label">
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
