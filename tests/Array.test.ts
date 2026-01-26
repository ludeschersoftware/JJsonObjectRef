import { resolveRefs } from '../src/Resolver';

describe('array references', () => {
    it('resolves array index paths', () => {
        const obj = {
            list: [{ v: 1 }, { v: 2 }],
            ref: '@ref:/list[1]/v'
        };

        resolveRefs(obj);
        expect(obj.ref).toBe(2);
    });

    it('resolves relative refs inside arrays', () => {
        const obj = {
            list: [
                { v: 1 },
                { v: '@ref:../0/v' }
            ]
        };

        resolveRefs(obj);
        expect(obj.list[1].v).toBe(1);
    });
});
