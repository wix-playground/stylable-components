import * as React from 'react';
import {Loader} from '../../src';

export class LoaderDemo extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Circle</th>
                        <th>Dots</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Loader
                                type="circle"
                            />
                        </td>
                        <td>
                            <Loader
                                type="dots"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
