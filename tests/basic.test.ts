const { resolveRefs } = require('../src');

const data = {
    theme: {
        color: {
            main: '#fff'
        }
    },
    page: {
        index: {
            hero: '@ref:/theme/color/main'
        }
    }
};

resolveRefs(data);

console.assert(data.page.index.hero === '#fff', 'Basic ref failed');
console.log('✔ basic test passed');
