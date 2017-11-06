# Image

The **Image** component represents an image on the DOM.


## API

#### Component Props

**Image** accepts all native `<img />` attributes, with several additional features listed below.


| name        | type       | default | required | description       |
| ----------- | ---------- | ------- | -------- | ----------------- |
| resizeMode | oneOf('fill', 'cover', 'contain') | 'fill' | no | Defines how the Image responds to the height and width of its content box. |
| defaultImage | string |  | no | URL to load when src is not provided|
| errorImage | string |  | no | URL to load if src (or defaultImage) loading result in an error|


## Usage & Best Practice

##### Resize Modes

`<Image>` allows specifying a `resizeMode` prop with these possible values: `fill`, `contain`, and `cover`. The behavior of `resizeMode` is the same as that of the CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) prop, except that `resizeMode` supports older browsers that don't support `object-fit`.

> Note: Just as in `object-fit`, `resizeMode` only affects images with both width and height axes provided (e.g. `width: 200px; height: 200px;`).


##### Avoiding user-agent "broken image" outline

When an `<img />` has no `src` prop, or it fails to load the specified image, some web browsers show a "broken image" placeholder or an outline around the element. These typically do not conform to the page design causing the page to appear broken.

The `<Image />` component allows supplying `defaultImage` to replace `src` if missing. If the source fails loading `errorImage` will be displayed. If `errorImage` is not supplied the `<Image/>` component will render an empty pixel.

```
src -> defaultImage -> errorImage -> one empty pixel
```



### React Code Example

**Example 1:**

```jsx
import * as React from 'react';
import {Image} from 'stylable-components';
import {stylable} from 'wix-react-tools';
import style from './imagex-demo.st.css';

@stylable(style)
export class ImageDemo extends React.Component<{}, ImageDemoState> {
    public state: ImageDemoState = {
            src: 'https://cdn.pixabay.com/photo/2012/02/19/10/49/owl-14918_960_720.jpg',
            resizeMode: 'fill'
        };
    
        public render() {
            return (
                <div>
                    <h2>Image</h2>
                    <div>
                        <label>src:
                            <input type="text" value={this.state.src} onChange={this.onSrcChange} />
                        </label>
                        <select value={this.state.resizeMode} onChange={this.onResizeModeChange}>
                            <option value="cover">cover</option>
                            <option value="contain">contain</option>
                            <option value="fill">fill</option>
                        </select>
                    </div>
                    <Image
                        src={this.state.src}
                        resizeMode={this.state.resizeMode}
                        className="myImage"
                        defaultImage="https://c1.staticflickr.com/7/6005/5927758528_a2060423e7_b.jpg"
                        errorImage="https://cdn.pixabay.com/photo/2016/10/10/12/02/eagle-owl-1728218_960_720.jpg"
                    />
                </div>
            );
        }
    
        private onSrcChange: React.ChangeEventHandler<HTMLInputElement> = e => {
            this.setState({src: e.target.value});
        }
    
        private onResizeModeChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
            this.setState({resizeMode: e.target.value as ImageDemoState['resizeMode']});
        }
}

```


## Style API

#### Custom CSS States (pseudo-classes)
| state | description|
| ----- | -----------|
| :loading | Styles the Image when image is loading
| :loaded | Styles the Image after it loads successfully
| :error | Styles the Image after if it fails during loading




### Style Code Example

```css
:import {
    -st-from: './components/image'; 
    -st-default: Image;
}

.myImage {
    -st-extends: Image;
    width: 300px;
    height: 200px;
    marginTop: 10px;
}

.myImage:loaded { border: 3px solid gold }

.myImage:loading { border: 3px solid grey }

.myImage:error { border: 3px solid red }

```
