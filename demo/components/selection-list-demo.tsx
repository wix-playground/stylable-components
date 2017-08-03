import React = require('react');
import {divider, ItemRendererProps, SelectionList} from '../../src/components/selection-list';

export class SelectionListDemo extends React.Component<{}, {}> {
    render() {
        return <div>
            <FoodList />
            <EmojiList />
        </div>;
    }
}

export class FoodList extends React.Component {
    dataSource = [
        {value: 'Fasting', label: ''},
        divider,
        'Eggs',
        'Bacon',
        'Sausage',
        'Ham',
        {value: 'Spam', label: 'Spam', disabled: true}
    ];

    state = {value: 'Bacon'};

    render() {
        return <div data-automation-id="FOOD">
            <h3>Options from a data source</h3>
            <SelectionList
                dataSource={this.dataSource}
                value={this.state.value}
                onChange={(value) => this.setState({value})} />
            <p data-automation-id="RESULT">
                {this.state.value}, great choice!
            </p>
        </div>;
    }
}

interface EmojiListItemProps extends ItemRendererProps {
    item: {
        value: string;
        icon: string;
    };
}

const EmojiListItem: React.SFC<EmojiListItemProps> = (props) => {
    const style = {
        fontSize: props.selected ? '45px' : '20px',
        transition: 'font-size 300ms',
        cursor: 'pointer'
    };

    return <div data-value={props.item.value} style={style}>
        {props.item.icon}
    </div>;
};

class EmojiList extends React.Component {
    dataSchema = {value: 'name', icon: 'icon'};

    dataSource = [
        {icon: '🦁', name: 'Lion'},
        {icon: '🐷', name: 'Pig'},
        {icon: '🦇', name: 'Bat'},
        {icon: '🐙', name: 'Octopus'},
        {icon: '🐌', name: 'Snail'},
        {icon: '🐝', name: 'Honeybee'}
    ];

    state = {value: 'Pig'};

    render() {
        const style = {
            display: 'flex',
            width: '300px',
            height: '60px',
            padding: '0 10px',
            borderRadius: '30px',
            alignItems: 'center',
            justifyContent: 'space-around'
        };
        const anArticleFor = (word: string) => /^[aeiou]/i.test(word) ? 'an' : 'a';

        return <div data-automation-id="EMOJI">
            <h3>Custom item renderer</h3>
            <SelectionList
                style={style}
                dataSchema={this.dataSchema}
                dataSource={this.dataSource}
                itemRenderer={EmojiListItem}
                value={this.state.value}
                onChange={(value) => this.setState({value})} />
            <p data-automation-id="RESULT">
                That's {anArticleFor(this.state.value)} {this.state.value.toLowerCase()}.
            </p>
        </div>;
    }
}
