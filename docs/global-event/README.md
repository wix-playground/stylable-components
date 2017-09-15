# GlobalEvent

Component abstraction over `addEventListener` on `window`.

## API

#### Component Props

Component accepts props which are keys of [WindowEventMap](https://github.com/Microsoft/TypeScript/blob/master/lib/lib.dom.d.ts#L13040), for example `click` from the next code snippet.

Value type is `Function` which has one `event` argument which has relevent event-related type, that may be found as value of [WindowEventMap](https://github.com/Microsoft/TypeScript/blob/master/lib/lib.dom.d.ts#L13040) object key with same name as name of the prop, for example `MouseEvent` from the next code snippet.

```ts
interface WindowEventMap extends GlobalEventHandlersEventMap {
    //...
    click: MouseEvent,
    //...
}
```

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
