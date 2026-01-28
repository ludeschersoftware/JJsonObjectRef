import { parseFallback, clone } from "../src/Utils";

describe("Utils full coverage", () => {
    /**
     * Covers Utils.ts line 16:
     * JSON.parse throws → fallback returned as raw string
     */
    test("parseFallback returns raw string when JSON parsing fails", () => {
        const bad = "{not:valid:json}";

        const result = parseFallback(bad);

        expect(result).toBe(bad);
    });

    /**
     * Covers Utils.ts line 21:
     * structuredClone is unavailable → JSON stringify fallback used
     */
    test("clone falls back when structuredClone is missing", () => {
        const originalStructuredClone = globalThis.structuredClone;

        // Force fallback branch
        (globalThis as any).structuredClone = undefined;

        const obj = { a: 1, nested: { b: 2 } };
        const copy = clone(obj);

        expect(copy).toEqual(obj);
        expect(copy).not.toBe(obj); // must be deep clone

        // Restore original
        globalThis.structuredClone = originalStructuredClone;
    });

    test("clone uses structuredClone when available", () => {
        if (typeof globalThis.structuredClone !== "function") {
            return; // skip in environments without it
        }

        const obj = { a: 1, nested: { b: 2 } };
        const copy = clone(obj);

        expect(copy).toEqual(obj);
        expect(copy).not.toBe(obj);
    });

    test("clone uses structuredClone when available", () => {
        if (typeof globalThis.structuredClone !== "function") return;

        const obj = { x: 1, nested: { y: 2 } };
        const copy = clone(obj);

        expect(copy).toEqual(obj);
        expect(copy).not.toBe(obj);
    });
});
