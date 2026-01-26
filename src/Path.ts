function resolvePath(ref, currentPath) {
    ref = ref.replace(/\[(\d+)\]/g, '.$1');
    const parts = ref.split('/').filter(Boolean);

    const base = ref.startsWith('/')
        ? []
        : currentPath.slice(0, -1);

    for (const part of parts) {
        if (part === '..') base.pop();
        else if (part !== '.') base.push(part);
    }

    return base;
}

module.exports = { resolvePath };
