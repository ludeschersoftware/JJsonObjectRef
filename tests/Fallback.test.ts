import { resolveRefs } from '../src/Resolver';

describe('fallback values', () => {
    it('uses fallback when reference is missing', () => {
        const obj = {
            value: '@ref:/missing ?? "default"'
        };

        resolveRefs(obj);
        expect(obj.value).toBe('default');
    });

    it('parses JSON fallback values', () => {
        const obj = {
            value: '@ref:/missing ?? {"a":1}'
        };

        resolveRefs(obj);
        expect(obj.value).toEqual({ a: 1 });
    });
});
