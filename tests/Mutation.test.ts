import { resolveRefs } from '../src/Resolver';

describe('mutation safety', () => {
    it('does not share object references', () => {
        const obj = {
            base: { x: 1 },
            a: '@ref:/base',
            b: '@ref:/base'
        };

        resolveRefs(obj);

        (obj.a as any).x = 99;
        expect((obj.b as any).x).toBe(1);
    });
});
