export class CircularReferenceError extends Error {
    constructor(path: string) {
        super(`Circular reference detected at "${path}"`);
        this.name = 'CircularReferenceError';
    }
}

export class UnresolvedReferenceError extends Error {
    constructor(ref: string) {
        super(`Unresolved reference: ${ref}`);
        this.name = 'UnresolvedReferenceError';
    }
}
