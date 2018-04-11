export function getScroll(): {scrollX: number, scrollY: number} {
    return {
        scrollX: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        scrollY: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    };
}
