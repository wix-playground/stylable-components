export function findFixedParent(node: HTMLElement | null): HTMLElement {
    if (!node) {
        return document.body;
    }
    return (node === document.body || window.getComputedStyle(node).position === 'fixed') ?
        node : findFixedParent(node.parentElement);
}

export  function findScrollParent(node: HTMLElement | null): HTMLElement {
    if (!node) {
        return document.body;
    }
    const style = window.getComputedStyle(node);
    return (
            node === document.body || style.overflow === 'auto' ||
            style.overflow === 'scroll' || style.position === 'fixed'
        ) ? node : findScrollParent(node.parentElement);
}

export interface Measurements {
    top: number;
    left: number;
    width: number;
    height: number;
    scrollX: number;
    scrollY: number;
    rootWidth: number;
    rootHeight: number;
    scrollParent: HTMLElement;
    fixedParent: HTMLElement;
}

export function measure(node: HTMLElement): Measurements {
    const {top, left, width, height} = node.getBoundingClientRect();
    const fixedParent = findFixedParent(node);
    const scrollParent = findScrollParent(node);
    const fixedParentRect = fixedParent.getBoundingClientRect();
    const scrollParentRect = scrollParent.getBoundingClientRect();

    const root = scrollParent === document.body ?
        {
            scrollX: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollY: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
            rootWidth: window.innerWidth,
            rootHeight: window.innerHeight
        } : {
            scrollX: scrollParent.scrollLeft,
            scrollY: scrollParent.scrollTop,
            rootWidth: scrollParentRect.width,
            rootHeight: scrollParentRect.height
        };

    return {
        top: top + fixedParentRect.top - scrollParentRect.top + root.scrollY,
        left: left + fixedParentRect.left - scrollParentRect.left + root.scrollX,
        width, height,
        fixedParent,
        scrollParent,
        ...root
    };
}
