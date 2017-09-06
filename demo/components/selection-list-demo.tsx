import React = require('react');
import {SBComponent} from 'stylable-react-component';
import {divider, Option, SelectionList} from '../../src/components/selection-list';
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
        return <Option value={value}>{label}</Option>;
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
                    <Option value="title">
                        <span className="text-style-title">Title</span>
                    </Option>
                    <Option value="heading">
                        <span className="text-style-heading">Heading</span>
                    </Option>
                    <Option value="heading-red">
                        <span className="text-style-heading-red">Heading Red</span>
                    </Option>
                    <Option value="body">
                        <span className="text-style-body">Body</span>
                    </Option>
                    <Option value="caption" disabled>
                        <span className="text-style-caption">Caption</span>
                    </Option>
                    <Option value="label">
                        <span className="text-style-label">Label</span>
                    </Option>
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
