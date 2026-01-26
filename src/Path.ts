export function resolvePath(ref: string, currentPath: JsonPath): JsonPath {
    ref = ref.replace(/\[(\d+)\]/g, '.$1');
    const isAbsolute = ref.startsWith('/');

    if (isAbsolute) {
        ref = ref.slice(1);
    }

    const segments = ref
        .split('/')
        .flatMap(seg => {
            if (seg === '.' || seg === '..') return [seg];
            return seg.split('.');
        })
        .filter(Boolean);

    let base: JsonPath;

    if (isAbsolute) {
        base = [];
    } else {
        // We always start from the parent of the current leaf
        base = currentPath.slice(0, -1);
    }

    for (const part of segments) {
        if (part === '.') {
            // "." means "this level", which is already our base.
            // We don't need to pop, but we also don't need to do anything.
            continue;
        }
        if (part === '..') {
            base.pop();
            continue;
        }
        const n = Number(part);
        base.push(Number.isNaN(n) ? part : n);
    }

    return base;
}