export function getScroll(node?: HTMLElement): {scrollX: number, scrollY: number} {
    return node && node !== document.body ?
        {
            scrollX: node.offsetLeft,
            scrollY: node.offsetTop
        } : {
            scrollX: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollY: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        };
}
