import * as React from 'react';
import { Slider } from '../../src';

export class SliderDemo extends React.Component<{}, {}> {
  render() {
    return (<Slider step={"any"} />);
  }
}
