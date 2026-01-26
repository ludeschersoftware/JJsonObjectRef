export function getByPath(obj: JsonValue, path: JsonPath): JsonValue | undefined {
    return path.reduce<JsonValue | undefined>(
        (acc, key) =>
            acc && typeof acc === 'object'
                ? (acc as any)[key]
                : undefined,
        obj
    );
}

export function parseFallback(
    fallback?: string
): JsonValue | undefined {
    if (!fallback) return undefined;
    try { return JSON.parse(fallback); }
    catch { return fallback; }
}

export function clone<T extends JsonValue>(value: T): T {
    if (typeof globalThis.structuredClone === 'function') {
        return globalThis.structuredClone(value);
    }

    return JSON.parse(JSON.stringify(value));
}