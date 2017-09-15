export function isRTL(context: any): boolean {
    return context && context.contextProvider && context.contextProvider.dir === 'rtl';
}
