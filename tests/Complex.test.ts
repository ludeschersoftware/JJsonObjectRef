import { resolveRefs } from '../src/Resolver';

describe('complex structures', () => {
    it('resolves nested mixed refs', () => {
        const obj = {
            theme: {
                colors: {
                    main: '#000'
                }
            },
            page: {
                index: {
                    blocks: [
                        {
                            color: '@ref:/theme/colors/main'
                        }
                    ]
                }
            }
        };

        resolveRefs(obj);
        expect(obj.page.index.blocks[0].color).toBe('#000');
    });
});
