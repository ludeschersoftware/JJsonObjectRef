import { resolveRefs } from '../src/Resolver';
import { UnresolvedReferenceError } from '../src/Errors';

describe('strict mode', () => {
    it('throws on unresolved refs when strict=true', () => {
        const obj = {
            a: '@ref:/missing'
        };

        expect(() => resolveRefs(obj, { strict: true }))
            .toThrow(UnresolvedReferenceError);
    });

    it('keeps value when strict=false', () => {
        const obj = {
            a: '@ref:/missing'
        };

        resolveRefs(obj, { strict: false });
        expect(obj.a).toBe('@ref:/missing');
    });
});
