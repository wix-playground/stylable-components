import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React = require('react');
import ReactDOM = require('react-dom');
import {sleep} from '../test/utils';

import {
    SelectionListModel as ModelClassic,
    SelectionListView as ViewClassic
} from '../src/components/selection-list/classic';

import {
    SelectionListModel as ModelMobx,
    SelectionListView as ViewMobx
} from '../src/components/selection-list/mobx';

const useMobx = true;
const itemCount = 10000;
const benchmark = fullRenderBenchmark;
const benchmarkCycles = 50;
const benchmarkWarmupCycles = 10;

class Test {
    public cycles: number = 0;
    public warmupCycles: number = 0;
    public setup: () => void;
    public run: () => void;
    public cleanup: () => void;

    constructor({cycles, warmupCycles}: {cycles: number, warmupCycles: number}) {
        this.cycles = cycles;
        this.warmupCycles = warmupCycles;
    }

    public async start() {
        const log = console.log;
        const durations = [];
        const totalCycles = this.cycles + this.warmupCycles;
        for (let i = 1; i <= totalCycles; i++) {
            await this.setup();
            log(`Test cycle ${i}/${totalCycles}`);
            const start = performance.now();
            await this.run();
            const end = performance.now();
            const duration = end - start;
            log(`Duration: ${duration.toFixed(1)}`);
            if (i > this.warmupCycles) {
                durations.push(duration);
            }
            await this.cleanup();
        }

        log(
            'Min: ' + Math.min(...durations).toFixed(1) + '; ' +
            'Max: ' + Math.max(...durations).toFixed(1) + '; ' +
            'Avg: ' + (durations.reduce(((t, x) => t + x), 0) / durations.length).toFixed(1)
        );
    }
}

const [Model, View] = useMobx ? [ModelMobx, ViewMobx] : [ModelClassic, ViewClassic];

class List extends React.PureComponent<{dataSource: string[], focusedValue: string}> {
    private list: any = new Model();

    public componentWillMount() {
        this.list.addDataSource({dataSource: this.props.dataSource});
        this.list.focusedValue = '0';
    }

    public render() {
        this.list.focusedValue = this.props.focusedValue;
        return <View list={this.list} focused={true} />;
    }
}

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);

function fullRenderBenchmark() {
    const dataSource = Array(itemCount).fill(0).map((_, i) => i.toString());
    const focusedValue = 0;
    const test = new Test({cycles: benchmarkCycles, warmupCycles: benchmarkWarmupCycles});

    test.setup = async () => {
        ReactDOM.render(<div />, rootContainer);
        await sleep(200);
    };

    test.run = async () => {
        ReactDOM.render(<List dataSource={dataSource} focusedValue={focusedValue.toString()} />, rootContainer);
    };

    test.cleanup = async () => {
        await sleep(200);
    };

    test.start();
}

function selectionChangeBenchmark() {
    const dataSource = Array(itemCount).fill(0).map((_, i) => i.toString());
    let focusedValue = 0;
    const test = new Test({cycles: benchmarkCycles, warmupCycles: benchmarkWarmupCycles});
    ReactDOM.render(<List dataSource={dataSource} focusedValue={focusedValue.toString()} />, rootContainer);

    test.setup = async () => {
        focusedValue = (focusedValue + 1) % 10;
        await sleep(500);
    };

    test.run = async () => {
        ReactDOM.render(<List dataSource={dataSource} focusedValue={focusedValue.toString()} />, rootContainer);
    };

    test.cleanup = async () => {
        await sleep(500);
    };

    test.start();
}

benchmark();
