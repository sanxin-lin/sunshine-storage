export declare const log: (...args: any[]) => void;
export declare const warning: (msg: string) => void;
export declare const throwError: (msg: string) => never;
export declare const safeExecute: (executor: any, errorHandler?: any) => any;
