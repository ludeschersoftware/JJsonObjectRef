declare global {
    type JsonPrimitive =
        | string
        | number
        | boolean
        | null;

    type JsonValue =
        | JsonPrimitive
        | JsonObject
        | JsonArray;

    interface JsonObject {
        [key: string]: JsonValue;
    }

    interface JsonArray extends Array<JsonValue> { }

    type JsonPath = Array<string | number>;

    interface ResolveOptions {
        strict?: boolean;
        refPrefix?: string;
        refAlias?: string;
    }
}

export { };