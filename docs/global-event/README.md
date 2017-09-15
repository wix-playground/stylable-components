# GlobalEvent

Component abstraction over `addEventListener` on `window`.

## API

#### Component Props

Component accepts props which are keys of [WindowEventMap](https://github.com/Microsoft/TypeScript/blob/master/lib/lib.dom.d.ts#L13040).

Value type is `Function` which has one `event` argument which has relevent event-related type.

### React Code Example

**Example 1:**

```jsx
import * as React from 'react';
import {GlobalEvent} from 'stylable-components';

export class ComponentsDemo extends React.Component<{}, {}>{
    public render() {
        return (
            <GlobalEvent click={this.onClickWindow} />
            // render other stuff
        );
    }

    private onClickWindow = () => alert('click on window')
}
```
