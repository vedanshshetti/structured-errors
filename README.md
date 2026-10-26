# structured-errors

Structured exceptions and errors for Python, TypeScript, and browser
JavaScript. Each error includes a human-readable message, a machine-readable
code, and the time at which it was created.

> **Status:** The packages are usable today, but the APIs are still small and
> may evolve as the project grows.

## What is included?

| Runtime | Package | Primary type | Distribution |
| --- | --- | --- | --- |
| Python | `exceptions_with_structure` | `StructuredException` | PyPI |
| TypeScript / Node.js | `@typescript-utils/structured-errors` | `StructuredError` | npm |
| Browser JavaScript | `StructuredError` | `StructuredError` | jsDelivr |

All implementations provide:

- a human-readable error message;
- a machine-readable error code;
- an ISO-8601 timestamp;
- a stack trace where the runtime provides one.

The TypeScript and JavaScript implementations also support an optional
underlying `cause` and conversion to either a JSON-friendly object or a log
string.

## Error-code convention

Use an uppercase `DOMAIN/ERROR` code, for example:

```text
HTTP/401
DATABASE/CONNECTION_TIMEOUT
AUTH/TOKEN_EXPIRED
```

TypeScript's type signature requires a code containing `/`, and the
TypeScript/JavaScript implementations normalize codes to uppercase. Python
accepts the code as supplied and does not currently validate its format.

## Installation

### Python

```bash
pip install exceptions_with_structure
```

### TypeScript or Node.js

```bash
npm install @typescript-utils/structured-errors
# or: pnpm add @typescript-utils/structured-errors
# or: yarn add @typescript-utils/structured-errors
```

### Browser JavaScript

Load the standalone browser build from jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/gh/vedanshshetti/structured-errors@latest/packages/js/index.js"></script>
```

The script exposes `StructuredError` on `window`.

## Usage

### Python

The distribution is named `exceptions_with_structure`; its Python module is
`py`.

```python
from py import StructuredException, StructuredValueError

try:
    raise StructuredException("File not found", "IO/FILE_NOT_FOUND")
except StructuredException as error:
    print(error)             # File not found
    print(error.error_code)  # IO/FILE_NOT_FOUND
    print(error.timestamp)   # 2026-10-26T19:29:47.805123

try:
    raise StructuredValueError("Expected a positive number", "VALUE/NOT_POSITIVE")
except StructuredValueError as error:
    print(error.error_code)
```

`StructuredException(message, error_code)` stores the message in the normal
Python exception and exposes `error_code` and `timestamp` attributes.
`timestamp` is generated with `datetime.now().isoformat()`, so it is an
ISO-8601 local timestamp without an explicit timezone offset.

The package also provides structured versions of these built-in exception
types:

`StructuredKeyError`, `StructuredTabError`, `StructuredNameError`,
`StructuredTypeError`, `StructuredValueError`, `StructuredIndexError`,
`StructuredBufferError`, `StructuredEOFError`, `StructuredImportError`,
`StructuredLookupError`, `StructuredMemoryError`, `StructuredSyntaxError`,
`StructuredRuntimeError`, `StructuredTimeoutError`, `StructuredUnicodeError`,
`StructuredOverflowError`, `StructuredAssertionError`, and
`StructuredAttributeError`.

### TypeScript

The package uses CommonJS-compatible `export =` syntax:

```typescript
import StructuredError = require("@typescript-utils/structured-errors");

try {
  throw new StructuredError(
    "Database connection failed",
    "DATABASE/CONNECTION_FAILED",
  );
} catch (error) {
  if (error instanceof StructuredError) {
    console.error(error.to("string"));
  }
}
```

The constructor is:

```typescript
new StructuredError(message, errorCode, cause?)
```

`errorCode` is uppercased when stored. `cause` is optional and may be any
value, including another `Error`.

### JavaScript

In Node.js, use the same CommonJS package:

```javascript
const StructuredError = require("@typescript-utils/structured-errors");

const error = new StructuredError(
  "Invalid input",
  "REQUEST/INVALID_INPUT",
  new Error("The original cause"),
);

console.log(error.to("json"));
console.log(error.to("string"));
```

For browser JavaScript loaded from the CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/vedanshshetti/structured-errors@latest/packages/js/index.js"></script>
<script>
  const error = new StructuredError("Not found", "HTTP/404");
  console.error(error.to("json"));
</script>
```

## Serialization

For TypeScript and JavaScript, `error.to("json")` returns an object with:

```text
name
message
errCode
timestamp
stack
cause
```

`error.to("string")` returns a formatted log string containing the timestamp,
code, message, and stack trace. If a stack trace is unavailable, the string
uses `No stack trace available`.

## Repository layout

```text
structured-errors/
├── packages/
│   ├── py/                  # Python package
│   │   ├── src/py/
│   │   │   ├── __init__.py
│   │   │   ├── Exceptions.py
│   │   │   └── utils.py
│   │   └── README.md
│   ├── ts/                  # TypeScript source and npm package
│   │   ├── src/index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── js/                  # Standalone browser JavaScript build
│       ├── index.js
│       └── README.md
├── SPEC.md
└── LICENSE
```

## Development

### Prerequisites

- Python 3.8 or newer
- Node.js and pnpm

### Python package

```bash
cd packages/py
pip install -e .
python -m build
```

### TypeScript package

```bash
cd packages/ts
pnpm install
pnpm run prepublishOnly
```

The TypeScript build writes declarations and source maps to `packages/ts/dist`.
The `postpublish` script removes `dist` after publishing.

## Contributing

Bug fixes, documentation improvements, and additional language
implementations are welcome. Before opening a pull request, please compile the
package you changed and describe any validation you could not run.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the project guidelines.

## License

This project is licensed under the
[European Union Public Licence 1.2](LICENSE).

## Support

For questions, bug reports, and feature requests, [open an issue on
GitHub](https://github.com/vedanshshetti/structured-errors/issues).
