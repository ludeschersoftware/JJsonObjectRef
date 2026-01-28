import { resolveRefs } from "../src/Resolver";
import {
    CircularReferenceError,
} from "../src/Errors";

describe("Extra coverage tests", () => {
    test("returns original string if refExpr cannot be parsed", () => {
        const data: any = {
            bad: "@ref:", // malformed ref
        };

        resolveRefs(data, { strict: false });

        expect(data.bad).toBe("@ref:");
    });

    test("resolves nested references correctly", () => {
        const data: any = {
            a: "@ref:/b",
            b: "@ref:/c",
            c: 123,
        };

        resolveRefs(data);

        expect(data.a).toBe(123);
        expect(data.b).toBe(123);
    });

    test("invalid fallback resolves to raw string instead of throwing", () => {
        const data: any = {
            x: "@ref:/missing ?? {notValidJson}",
        };

        resolveRefs(data, { strict: true });

        // JSON.parse fails → fallback returned as string
        expect(data.x).toBe("{notValidJson}");
    });

    test("getByPath returns undefined when path is impossible", () => {
        const data: any = {
            a: 5,
            x: "@ref:/a/b",
        };

        resolveRefs(data, { strict: false });

        expect(data.x).toBe("@ref:/a/b");
    });

    test("detects circular reference through nested refs", () => {
        const data: any = {
            a: "@ref:/b",
            b: "@ref:/a",
        };

        expect(() => resolveRefs(data)).toThrow(CircularReferenceError);
    });

    test("leaves malformed @ref: unchanged", () => {
        const data: any = { bad: "@ref:" };

        resolveRefs(data);

        expect(data.bad).toBe("@ref:");
    });

    test("returns node unchanged if regex match fails completely", () => {
        const data: any = {
            bad: "@ref:\n", // newline breaks the regex
        };

        resolveRefs(data);

        expect(data.bad).toBe("@ref:\n");
    });
});
