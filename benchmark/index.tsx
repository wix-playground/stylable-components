import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React = require('react');
import ReactDOM = require('react-dom');
import {SelectionListModel, SelectionListView} from '../src/components/selection-list';
import {sleep} from '../test/utils';
import {benchmark} from './benchmark';

class List extends React.PureComponent<{dataSource: string[], focusedValue: string}> {
    private list: SelectionListModel = new SelectionListModel();

    public componentWillMount() {
        this.list.addDataSource({dataSource: this.props.dataSource});
        this.list.selectValue('0');
    }

    public render() {
        this.list.selectValue(this.props.focusedValue);
        return <SelectionListView list={this.list} focused={true} />;
    }
}

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const itemCount = 10000;
const cycles = 50;
const warmupCycles = 10;
benchmarkFullRender();

function benchmarkFullRender() {
    const dataSource = Array(itemCount).fill(0).map((_, i) => i.toString());
    const focusedValue = 0;

    const setup = async () => {
        await sleep(200);
        ReactDOM.render(<div />, rootElement);
        await sleep(200);
    };

    const run = async () => {
        ReactDOM.render(<List dataSource={dataSource} focusedValue={focusedValue.toString()} />, rootElement);
    };

    benchmark({cycles, warmupCycles, setup, run});
}

function benchmarkSelectionChange() {
    const dataSource = Array(itemCount).fill(0).map((_, i) => i.toString());
    let focusedValue = 0;
    ReactDOM.render(<List dataSource={dataSource} focusedValue={focusedValue.toString()} />, rootElement);

    const setup = async () => {
        await sleep(100);
        focusedValue = (focusedValue + 1) % 10;
        await sleep(100);
    };

    const run = async () => {
        ReactDOM.render(<List dataSource={dataSource} focusedValue={focusedValue.toString()} />, rootElement);
    };

    benchmark({cycles, warmupCycles, setup, run});
}
