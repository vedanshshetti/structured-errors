# exceptions_with_structure

A small Python package providing `StructuredException`, an exception with a
machine-readable error code and an ISO-8601 creation timestamp.

## Installation

```bash
pip install exceptions_with_structure
```

## Usage

```python
from py import StructuredException

try:
    raise StructuredException("File not found", "IO_ERR_404")
except StructuredException as error:
    print(error)
    print(error.error_code)
    print(error.timestamp)
```

`StructuredException` accepts a human-readable `message` and an `error_code`.
The `timestamp` field is generated when the exception is created.

## Development

From this directory, install the package in editable mode:

```bash
pip install -e .
```

Build distributable archives with:

```bash
python -m build
```

The package requires Python 3.8 or newer and is licensed under EUPL-1.2.
