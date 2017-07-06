export const isBrowser: boolean = typeof window !== 'undefined';

// for server-side-rendering, we assume the client will support object-fit
export const objectFitSupported: boolean = !isBrowser || ('object-fit' in document.createElement('img').style);
