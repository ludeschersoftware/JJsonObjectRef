# json-object-ref

Resolve absolute and relative references inside JSON-like objects.

## Features
- Absolute refs: `@ref:/page/index`
- Relative refs: `@ref:../image`
- Fallbacks: `@ref:/missing ?? "default"`
- Circular reference detection
- `$ref` alias support

## Usage

```js
const { resolveRefs } = require('json-object-ref');

const config = {
  theme: { color: { main: '#fff' } },
  page: { index: { hero: '@ref:/theme/color/main' } }
};

resolveRefs(config);
