export interface Context {
    contextProvider?: {
        dir?: string;
    };
}
export declare function isRTLContext(context: Context): boolean;
