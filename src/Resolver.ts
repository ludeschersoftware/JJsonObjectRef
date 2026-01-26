import { resolvePath } from './Path';
import { getByPath, parseFallback, clone } from './Utils';
import { CircularReferenceError, UnresolvedReferenceError } from './Errors';

export function resolveRefs(
    root: JsonValue,
    options: ResolveOptions = {}
): JsonValue {
    const {
        strict = true,
        refPrefix = '@ref:',
        refAlias = '$ref:'
    } = options;

    const cache = new Map<string, JsonValue>();
    const stack = new Set<string>();

    function resolveValue(
        node: JsonValue,
        currentPath: JsonPath
    ): JsonValue {
        if (typeof node !== 'string') return node;

        let refExpr: string | undefined;
        let fallback: string | undefined;

        if (node.startsWith(refPrefix)) {
            [, refExpr, fallback] =
                node.match(/^@ref:(.+?)(?:\s*\?\?\s*(.+))?$/) ?? [];
        } else if (node.startsWith(refAlias)) {
            [, refExpr, fallback] =
                node.match(/^\$ref:(.+?)(?:\s*\?\?\s*(.+))?$/) ?? [];
        } else {
            return node;
        }

        if (!refExpr) return node;
        const normalizedRef = refExpr; // keep leading slash — let Path decide
        const refPath = resolvePath(normalizedRef, currentPath);
        const key = refPath.join('.');

        if (cache.has(key)) return clone(cache.get(key)!);
        if (stack.has(key)) throw new CircularReferenceError(key);

        stack.add(key);
        const value = getByPath(root, refPath);

        if (typeof value === 'string' && value.startsWith(refPrefix)) {
            // force resolution to detect cycles
            stack.add(key);
            const resolved = resolveValue(value, refPath);
            stack.delete(key);
            cache.set(key, resolved);
            return clone(resolved);
        }

        stack.delete(key);

        if (value === undefined) {
            const fb = parseFallback(fallback);
            if (fb !== undefined) return fb;
            if (strict) throw new UnresolvedReferenceError(refExpr);
            return node;
        }

        cache.set(key, value);
        return clone(value);
    }

    function walk(node: JsonValue, path: JsonPath = []): void {
        if (Array.isArray(node)) {
            node.forEach((v, i) => {
                const resolved = resolveValue(v, [...path, i]);
                if (resolved !== v) node[i] = resolved;
                walk(node[i], [...path, i]);
            });
        } else if (node && typeof node === 'object') {
            Object.keys(node).forEach(k => {
                const resolved = resolveValue(node[k], [...path, k]);
                if (resolved !== node[k]) node[k] = resolved;
                walk(node[k], [...path, k]);
            });
        }
    }

    walk(root);
    return root;
}
