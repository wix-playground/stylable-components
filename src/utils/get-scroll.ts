function findFixedParent(node: HTMLElement): HTMLElement {
    return (node === document.body || window.getComputedStyle(node).position === 'fixed') ?
        node : findFixedParent(node.parentElement!);
}

export function getScroll(node?: HTMLElement): {scrollX: number, scrollY: number} {
    const fixedNode = node && findFixedParent(node);
    return fixedNode && fixedNode !== document.body ?
        {
            scrollX: fixedNode.offsetLeft,
            scrollY: fixedNode.offsetTop
        } : {
            scrollX: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollY: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        };
}
