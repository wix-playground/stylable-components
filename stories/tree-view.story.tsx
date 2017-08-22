import * as React from 'react';

import {storiesOf} from '@storybook/react';
import {TreeViewDemo} from '../demo/components/tree-view-demo';

storiesOf('TreeView', module)
    .add('demo', () => <TreeViewDemo />);
