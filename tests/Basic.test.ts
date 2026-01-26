import { resolveRefs } from '../src/Resolver';

describe('basic reference resolution', () => {
    it('resolves a simple absolute reference', () => {
        const obj = {
            theme: { color: { main: '#fff' } },
            page: { hero: '@ref:/theme/color/main' }
        };

        resolveRefs(obj);

        expect(obj.page.hero).toBe('#fff');
    });
});
