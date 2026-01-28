A lightweight utility to resolve **absolute and relative references** inside JSON-like objects.  
Designed for configuration files, reusable templates, and structured data where values may point to other parts of the same object.

This package allows you to write references like:

- `@ref:/path/to/value`
- `$ref:/path/to/value`
- with optional fallback values using `??`

---

## 🚀 Features

- ✅ Resolve absolute references (`/root/value`)
- ✅ Resolve relative references (`../sibling/value`)
- ✅ Supports both `@ref:` and `$ref:` alias syntax
- ✅ Optional fallback values (`??`)
- ✅ Detects circular references automatically
- ✅ Works with nested objects and arrays
- ✅ Type-safe and zero dependencies
- ✅ Dual build: CommonJS + ES Modules

---

## 📦 Installation

```bash
npm install @ludeschersoftware/json-object-ref
````

or with Yarn:

```bash
yarn add @ludeschersoftware/json-object-ref
```

---

## 🧠 Concept

The idea is simple:

* Any string value beginning with `@ref:` (or `$ref:`) is treated as a reference.
* The reference is resolved against the root JSON object.
* The referenced value replaces the reference string in-place.

This makes it easy to reuse values and avoid duplication in large configuration objects.

---

## 🛠️ Basic Usage

### 1. Import the Resolver

```ts
import { resolveRefs } from "@ludeschersoftware/json-object-ref";
```

---

### 2. Define a JSON Object with References

```ts
const config = {
  host: "localhost",
  port: 8080,

  apiUrl: "@ref:/host",
};
```

---

### 3. Resolve References

```ts
resolveRefs(config);

console.log(config.apiUrl); // "localhost"
```

---

## 📌 Absolute References

Absolute references always start at the root using `/`:

```ts
const obj = {
  database: {
    host: "db.local",
    url: "@ref:/database/host",
  },
};

resolveRefs(obj);

console.log(obj.database.url); // "db.local"
```

---

## 📍 Relative References

Relative references resolve based on the current object position:

```ts
const obj = {
  server: {
    host: "localhost",
    url: "@ref:./host",
  },
};

resolveRefs(obj);

console.log(obj.server.url); // "localhost"
```

You can also go upward:

```ts
const obj = {
  rootValue: 123,
  nested: {
    value: "@ref:../rootValue",
  },
};

resolveRefs(obj);

console.log(obj.nested.value); // 123
```

---

## 🔁 Arrays Are Supported

References work inside arrays as well:

```ts
const obj = {
  values: [10, 20, "@ref:/values/0"],
};

resolveRefs(obj);

console.log(obj.values); // [10, 20, 10]
```

---

## 💡 Fallback Values

If a reference cannot be resolved, you can provide a fallback:

```ts
const obj = {
  value: "@ref:/missing ?? 42",
};

resolveRefs(obj);

console.log(obj.value); // 42
```

Fallback values support JSON parsing:

```ts
const obj = {
  settings: "@ref:/none ?? {\"enabled\":true}",
};

resolveRefs(obj);

console.log(obj.settings); // { enabled: true }
```

If JSON parsing fails, the fallback is treated as a raw string.

---

## ⚠️ Strict vs Non-Strict Mode

By default, unresolved references throw an error:

```ts
resolveRefs(obj); // throws UnresolvedReferenceError
```

To allow unresolved references silently:

```ts
resolveRefs(obj, { strict: false });
```

---

## 🔄 Circular Reference Detection

Circular references are automatically detected:

```ts
const obj = {
  a: "@ref:/b",
  b: "@ref:/a",
};

resolveRefs(obj); // throws CircularReferenceError
```

---

## ⚙️ Options

You can customize resolver behavior:

```ts
resolveRefs(obj, {
  strict: true,
  refPrefix: "@ref:",
  refAlias: "$ref:",
});
```

| Option      | Default | Description              |
| ----------- | ------- | ------------------------ |
| `strict`    | `true`  | Throw on unresolved refs |
| `refPrefix` | `@ref:` | Primary reference syntax |
| `refAlias`  | `$ref:` | Alternative alias syntax |

---

## 🧩 Use Cases

This library is useful for:

* Configuration files
* JSON templates
* Environment-based overrides
* Reusable nested values
* Declarative structured data

Example:

```ts
const config = {
  defaults: {
    timeout: 5000,
  },
  api: {
    timeout: "@ref:/defaults/timeout",
  },
};

resolveRefs(config);

console.log(config.api.timeout); // 5000
```

---

## 📦 Module Support

This package ships with both:

* CommonJS (`require`)
* ES Modules (`import`)

So it works in:

* Node.js projects
* Modern bundlers (Vite/Webpack/Rollup)
* TypeScript projects

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests under `tests/`
4. Run:

```bash
yarn test
yarn test:coverage
```

5. Submit a Pull Request 🚀

---

## License

MIT © Johannes Ludescher