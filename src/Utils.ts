function getByPath(obj, path) {
    return path.reduce((a, k) => a?.[k], obj);
}

function parseFallback(fallback) {
    if (!fallback) return undefined;
    try { return JSON.parse(fallback); }
    catch { return fallback; }
}

function clone(value) {
    return typeof structuredClone === 'function'
        ? structuredClone(value)
        : JSON.parse(JSON.stringify(value));
}

module.exports = {
    getByPath,
    parseFallback,
    clone
};
