const { resolvePath } = require('./path');
const { parseFallback, getByPath, clone } = require('./utils');
const { CircularReferenceError, UnresolvedReferenceError } = require('./errors');

function resolveRefs(root, options = {}) {
    const {
        strict = true,
        refPrefix = '@ref:',
        refAlias = '$ref'
    } = options;

    const cache = new Map();
    const stack = new Set();

    function resolveValue(node, currentPath) {
        if (typeof node !== 'string') return node;

        let refExpr, fallback;

        if (node.startsWith(refPrefix)) {
            [, refExpr, fallback] =
                node.match(/^@ref:(.+?)(?:\s*\?\?\s*(.+))?$/) || [];
        } else if (node.startsWith(refAlias)) {
            [, refExpr, fallback] =
                node.match(/^\$ref:(.+?)(?:\s*\?\?\s*(.+))?$/) || [];
        } else {
            return node;
        }

        const refPath = resolvePath(refExpr, currentPath);
        const key = refPath.join('.');

        if (cache.has(key)) return clone(cache.get(key));
        if (stack.has(key)) throw new CircularReferenceError(key);

        stack.add(key);
        const value = getByPath(root, refPath);
        stack.delete(key);

        if (value === undefined) {
            const fb = parseFallback(fallback);
            if (fb !== undefined) return fb;
            if (strict) throw new UnresolvedReferenceError(refExpr);
            return undefined;
        }

        cache.set(key, value);
        return clone(value);
    }

    function walk(node, path = []) {
        if (Array.isArray(node)) {
            node.forEach((v, i) => {
                const r = resolveValue(v, [...path, i]);
                if (r !== v) node[i] = r;
                walk(node[i], [...path, i]);
            });
        } else if (node && typeof node === 'object') {
            Object.keys(node).forEach(k => {
                const r = resolveValue(node[k], [...path, k]);
                if (r !== node[k]) node[k] = r;
                walk(node[k], [...path, k]);
            });
        }
    }

    walk(root);
    return root;
}

module.exports = { resolveRefs };
