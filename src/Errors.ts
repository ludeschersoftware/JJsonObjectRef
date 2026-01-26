class CircularReferenceError extends Error {
    constructor(path) {
        super(`Circular reference detected at "${path}"`);
        this.name = 'CircularReferenceError';
    }
}

class UnresolvedReferenceError extends Error {
    constructor(ref) {
        super(`Unresolved reference: ${ref}`);
        this.name = 'UnresolvedReferenceError';
    }
}

module.exports = {
    CircularReferenceError,
    UnresolvedReferenceError
};
