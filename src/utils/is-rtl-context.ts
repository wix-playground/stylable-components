export interface Context {
    contextProvider?: {
        dir?: string
    };
}

export function isRTLContext(context: Context): boolean {
    return Boolean(context && context.contextProvider) && context.contextProvider!.dir === 'rtl';
}
