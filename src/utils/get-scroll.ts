export function findFixedParent(node: HTMLElement): HTMLElement {
    return (node === document.body || window.getComputedStyle(node).position === 'fixed') ?
        node : findFixedParent(node.parentElement!);
}

export  function findScrollParent(node: HTMLElement): HTMLElement {
    const style = window.getComputedStyle(node);
    return (node === document.body || style.overflow === 'auto' || style.overflow === 'scroll') ?
        node : findScrollParent(node.parentElement!);
}

export interface Measure {
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

export function measure(node: HTMLElement): Measure {
    const {top, left, width, height} = node.getBoundingClientRect();
    const fixedParent = findFixedParent(node);
    const scrollParent = findScrollParent(node);

    const root = scrollParent === document.body ?
        {
            scrollX: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollY: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
            rootWidth: window.innerWidth,
            rootHeight: window.innerHeight
        } : {
            scrollX: scrollParent.scrollLeft,
            scrollY: scrollParent.scrollTop,
            rootWidth: scrollParent.offsetWidth,
            rootHeight: scrollParent.offsetHeight
        };

    return {
        top: top + fixedParent.offsetTop - scrollParent.offsetTop + root.scrollY,
        left: left + fixedParent.offsetLeft - scrollParent.offsetLeft + root.scrollX,
        width, height,
        fixedParent,
        scrollParent,
        ...root
    };
}
