import * as React from 'react';
import { DatePicker, DatePickerProps } from '../../src';
import styles from './date-picker-demo.st.css';

export interface DatePickerDemoState {
    value: Date;
    startingDay?: number;
}

export class DatePickerDemo extends React.Component<DatePickerProps, DatePickerDemoState> {
    public state: DatePickerDemoState = {
        value: this.props.value ? this.props.value : new Date()
    };

    public render() {
        return (
            <div className={styles.container}>
                <div className={styles.background} style={this.backgroundImage} />
                <h2 className={styles.title}>Pick a season</h2>
                <div className={styles.datepickerContainer}>
                    <div className={styles.datepicker}>
                        <span data-automation-id="CURRENT_DATE" style={{ opacity: 0 }}>
                            {this.state.value.toDateString()}
                        </span>
                        <DatePicker
                            {...this.props}
                            data-automation-id="BASIC_DATEPICKER"
                            placeholder="mm/dd/yyyy"
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private onChange = (updatedDate: Date): void => {
        this.setState({ value: updatedDate });
    }

    private get backgroundImage(): object {
        const month: number = this.state.value.getMonth();

        if (month >= 2 && month < 5) {
            return  { 'backgroundImage':
                'url("http://i.imgur.com/EWynBnd.gif")' };
        } else if (month >= 8 && month < 11) {
            return {
                'backgroundImage':
                    'url("https://media.giphy.com/media/5xtDarFdKZA7Df8V67u/giphy.gif")'
            };
        } else if (month >= 11 || month < 2) {
            return {
                'backgroundImage':
                    'url("https://68.media.tumblr.com/tumblr_ma5p1oh8oQ1rwlsczo1_500.gif")'
            };
        } else {
            return { 'backgroundImage':
                'url("https://media.giphy.com/media/xme2XN3AzQOEU/giphy.gif")' };
        }
    }
}

export class DatePickerDemoStartingDay extends React.Component<DatePickerProps, Partial<DatePickerDemoState>> {
    public state: DatePickerDemoState = {
        value: this.props.value ? this.props.value : new Date(),
        startingDay: 0
    };

    public render() {
        return (
            <div className={styles.container}>
                <h2>Try changing which day of the week the calendar starts on!</h2>
                <span>
                    <select
                        value={this.state.startingDay}
                        onChange={this.setStartingDay}
                    >
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                    </select>
                </span>
                <span data-automation-id="CURRENT_DATE">{this.state.value!.toDateString()}</span>
                <DatePicker
                    placeholder="mm/dd/yyyy"
                    startingDay={this.state.startingDay!}
                    showDropdownOnInit={true}
                    value={this.state.value!}
                    onChange={this.onChange}
                    {...this.props}
                />
            </div>
        );
    }

    private setStartingDay = (event: React.SyntheticEvent<HTMLSelectElement>): void => {
        const target = event.target as HTMLSelectElement;
        this.setState({ startingDay: parseInt(target.value, 10) });
    }

    private onChange = (updatedDate: Date): void => {
        this.setState({ value: updatedDate });
    }
}
