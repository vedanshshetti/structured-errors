# structured-errors

> Standardized error classes with ISO-8601 timestamps and machine-readable codes for Python and TypeScript.

## At a glance

| Package | Install | Main type |
|---------|---------|-----------|
| Python | `exceptions_with_structure` | `StructuredException` |
| TypeScript / JavaScript | `@typescript-utils/structured-errors` | `StructuredError` |

## Contributors

- **Python**: Vedansh Shetti ([@vedanshshetti](https://github.com/vedanshshetti))
- **JavaScript**: Vedansh Shetti ([@vedanshshetti](https://github.com/vedanshshetti))
- **TypeScript**: Vedansh Shetti ([@vedanshshetti](https://github.com/vedanshshetti))

## Overview

Each implementation adds the following information to a normal error:

- **ISO-8601 timestamp** - When the error was instantiated. Python uses the local
  time without a timezone offset; TypeScript uses UTC.
- **Machine-readable error code** - For programmatic error handling.
- **Human-readable message** - For debugging and user feedback.
- **Optional cause chaining** - Available in the TypeScript implementation.

## Packages

This monorepo contains the following language implementations:

| Language | Package | Description |
|----------|---------|-------------|
| Python | [`packages/py/`](packages/py/) | Python exception class with structured fields |
| TypeScript | [`packages/ts/`](packages/ts/) | TypeScript Error subclass with JSON serialization |

## Installation

### Python

The Python package is published as `exceptions_with_structure` and requires Python 3.8+.

#### Using pip

```bash
pip install exceptions_with_structure
```

#### From source (development)

```bash
# Navigate to the Python package
cd packages/py

# Install in development mode
pip install -e .

# Or build and install
pip install build
python -m build
pip install dist/exceptions_with_structure-*.whl
```

#### Usage

```python
from py import StructuredException, StructuredValueError

try:
    raise StructuredException("File not found", "IO_ERR_404")
except StructuredException as e:
    print(f"Error {e.error_code}: {e}")
    print(f"Timestamp: {e.timestamp}")

try:
    raise StructuredValueError("Expected a positive number", "VALUE_ERR_POSITIVE")
except StructuredValueError as e:
    print(f"Error {e.error_code}: {e}")
```

`StructuredException` accepts `message` and `error_code` and exposes `timestamp`.
The package also provides structured variants of common built-in exceptions,
including `StructuredTypeError`, `StructuredValueError`, `StructuredKeyError`,
`StructuredIndexError`, `StructuredImportError`, and `StructuredLookupError`.
It does not currently support an underlying cause parameter.

### TypeScript / JavaScript

The TypeScript package is published as `@typescript-utils/structured-errors`.

#### Using npm

```bash
npm install @typescript-utils/structured-errors
```

#### Using yarn

```bash
yarn add @typescript-utils/structured-errors
```

#### Using pnpm

```bash
pnpm add @typescript-utils/structured-errors
```

#### From source (development)

```bash
# Navigate to the TypeScript package
cd packages/ts

# Install dependencies
pnpm install

# Build the package
pnpm run prepublishOnly

# Link locally for development
pnpm link --global
```

#### Usage

**TypeScript:**

```typescript
import StructuredError = require('@typescript-utils/structured-errors');

try {
    throw new StructuredError("Database connection failed", "DB_CONN_ERR");
} catch (error) {
    if (error instanceof StructuredError) {
        console.error(error.to("string"));
        // [2026-10-17T...Z]: "DB_CONN_ERR" - "Database connection failed" @ ...

        console.log(error.to("json"));
        // {
        //   name: 'StructuredError',
        //   message: 'Database connection failed',
        //   errCode: 'DB_CONN_ERR',
        //   timestamp: '2026-10-17T...Z',
        //   stack: '...',
        //   cause: undefined
        // }
    }
}
```

**JavaScript (CommonJS):**

```javascript
const StructuredError = require('@typescript-utils/structured-errors');

const error = new StructuredError("Invalid input", "VALIDATION_ERR", new Error("Original cause"));
console.error(error.to("json"));
```

Or use the CDN at `https://cdn.jsdelivr.net/gh/vedanshshetti/structured-errors@latest/packages/js/index.js`:

```html
<script src="https://cdn.jsdelivr.net/gh/vedanshshetti/structured-errors@latest/packages/js/index.js"></script>
```
or
```js
import StructuredError from "https://cdn.jsdelivr.net/gh/vedanshshetti/structured-errors@latest/packages/js/index.js";
```

`to("json")` returns an object containing `name`, `message`, `errCode`,
`timestamp`, `stack`, and `cause`. `to("string")` returns a formatted string
for logs. The `cause` argument is optional and may contain any underlying
error or value.

## Repository structure

```
structured-errors/
├── packages/
│   ├── py/
│   │   ├── src/py/
│   │   │   ├── __init__.py      # Public Python exports
│   │   │   ├── Exceptions.py    # Structured exception classes
│   │   │   └── utils.py         # ISO-8601 timestamp helper
│   │   ├── pyproject.toml        # Python package configuration
│   │   └── README.md
│   └── ts/
│       ├── src/
│       │   └── index.ts          # StructuredError class
│       ├── package.json          # npm package configuration
│       ├── tsconfig.json         # TypeScript configuration
│       └── pnpm-lock.yaml        # Dependency lock file
├── LICENSE
└── README.md
```

## Development

### Prerequisites

- **Python 3.8+** for the Python package
- **Node.js** and **pnpm** for the TypeScript package

### Setting up the monorepo

```bash
# Clone the repository
git clone https://github.com/vedanshshetti/structured-errors.git
cd structured-errors

# Set up Python package
cd packages/py
pip install -e .
cd ../..

# Set up TypeScript package
cd packages/ts
pnpm install
pnpm run prepublishOnly
pnpm link --global
```

### Building packages

```bash
# Build Python package
cd packages/py
python -m build

# Build TypeScript package
cd ../ts
pnpm run prepublishOnly
```

The TypeScript build emits declarations and source maps in `packages/ts/dist`.
The package's `postpublish` script removes that directory after publishing.

## License

All packages in this monorepo are licensed under the **European Union Public Licence 1.2 (EUPL-1.2)**.

See [LICENSE](LICENSE) for full license text.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for:

- Bug fixes
- Feature requests
- New language implementations
- Documentation improvements

## Versioning

Each package maintains its own version number in its respective configuration file:

- Python: `packages/py/pyproject.toml`
- TypeScript: `packages/ts/package.json`

## Support

For questions, issues, or feature requests, please
[open an issue](https://github.com/vedanshshetti/structured-errors/issues) on GitHub.
