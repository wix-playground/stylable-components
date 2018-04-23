import {OverlayManager} from 'html-overlays';

export type Component = React.Component<any>;
export interface MapValue {
    overlayManager: OverlayManager;
    listeners: Set<Component>;
}
export class Overlays {
    private map = new Map<HTMLElement, MapValue>();

    public create(component: Component, node: HTMLElement): OverlayManager {
        if (!this.map.has(node)) {
            this.map.set(node, {
                listeners: new Set(),
                overlayManager: new OverlayManager(node)
            });
        }
        const {listeners, overlayManager} = this.map.get(node)!;
        listeners.add(component);
        return overlayManager;
    }

    public remove(component: React.Component<any>, node: HTMLElement) {
        if (!this.map.has(node)) {
            return;
        }
        const {listeners, overlayManager} = this.map.get(node)!;
        listeners.delete(component);
        if (!listeners.size) {
            overlayManager.removeSelf();
            this.map.delete(node);
        }
    }

    public removeAll() {
        this.map.forEach(({listeners, overlayManager}) => {
            listeners.clear();
            overlayManager.removeSelf();
        });
        this.map.clear();
    }

    public getAll() {
        return Array.from(this.map.values());
    }
}

export const overlays = new Overlays();
