export function measure(node?: HTMLElement): {
    scrollX: number,
    scrollY: number,
    width: number,
    height: number
} {
    return node && node !== document.body ?
        {
            scrollX: node.scrollLeft,
            scrollY: node.scrollTop,
            width: node.offsetWidth,
            height: node.offsetHeight
        } : {
            scrollX: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollY: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
            width: window.innerWidth,
            height: window.innerHeight
        };
}
