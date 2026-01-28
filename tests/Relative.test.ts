import { resolveRefs } from '../src/Resolver';

describe('relative references', () => {
    it('resolves ../ correctly', () => {
        const obj = {
            a: {
                value: 10,
                b: {
                    ref: '@ref:../value'
                }
            }
        };

        resolveRefs(obj);
        expect(obj.a.b.ref).toBe(10);
    });

    it('resolves ./ correctly', () => {
        const obj = {
            a: {
                b: {
                    value: 5,
                    ref: '@ref:./value'
                }
            }
        };

        resolveRefs(obj);
        expect(obj.a.b.ref).toBe(5);
    });
});
