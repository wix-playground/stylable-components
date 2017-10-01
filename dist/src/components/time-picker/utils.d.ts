export declare enum Ampm {
    AM = 0,
    PM = 1,
    NONE = 2,
}
export declare type TimeSegment = 'hh' | 'mm';
export declare type Format = 'ampm' | '24h';
export declare type Segment = TimeSegment | 'ampm';
export declare const isTouchTimeInputSupported: boolean;
export declare const is12TimeFormat: boolean;
export declare const ampmLabels: {
    [x: number]: string;
};
export declare function formatTimeChunk(num: string | number): string;
export declare function isTimeSegment(arg: any): arg is TimeSegment;
export declare function to24(hh: number, ampm: Ampm): number;
export declare function toAmpm(hh: number): {
    hh: number;
    ampm: Ampm;
};
export declare function isValidValue(num: number, part: TimeSegment, ampm: Ampm): boolean;
