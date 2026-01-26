import { resolveRefs } from '../src/Resolver';
import { CircularReferenceError } from '../src/Errors';

describe('circular references', () => {
    it('throws on self-reference', () => {
        const obj = {
            a: '@ref:/a'
        };

        expect(() => resolveRefs(obj)).toThrow(CircularReferenceError);
    });

    it('throws on indirect cycles', () => {
        const obj = {
            a: '@ref:/b',
            b: '@ref:/a'
        };

        expect(() => resolveRefs(obj)).toThrow(CircularReferenceError);
    });
});
