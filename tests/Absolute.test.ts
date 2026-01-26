import { resolveRefs } from '../src/Resolver';

describe('absolute references', () => {
    it('resolves deeply nested absolute paths', () => {
        const obj = {
            a: { b: { c: 42 } },
            x: '@ref:/a/b/c'
        };

        resolveRefs(obj);
        expect(obj.x).toBe(42);
    });
});
