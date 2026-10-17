from .utils import iso8601

class StructuredException(Exception):
    """Base class for all structured errors."""
    def __init__(self, message: str, error_code: str):
        super().__init__(message)
        self.timestamp = iso8601()
        self.error_code = error_code

# Dynamically create specific error types to avoid code duplication
def _create_structured_error(base_class: type[Exception], name: str) -> type[StructuredException]:
    class NewStructuredError(StructuredException, base_class):
        pass
    NewStructuredError.__name__ = name
    NewStructuredError.__qualname__ = name
    return NewStructuredError

StructuredKeyError = _create_structured_error(KeyError, "StructuredKeyError")
StructuredTabError = _create_structured_error(TabError, "StructuredTabError")
StructuredNameError = _create_structured_error(NameError, "StructuredNameError")
StructuredTypeError = _create_structured_error(TypeError, "StructuredTypeError")
StructuredValueError = _create_structured_error(ValueError, "StructuredValueError")
StructuredIndexError = _create_structured_error(IndexError, "StructuredIndexError")
StructuredBufferError = _create_structured_error(BufferError, "StructuredBufferError")
StructuredEOFError = _create_structured_error(EOFError, "StructuredEOFError")
StructuredImportError = _create_structured_error(ImportError, "StructuredImportError")
StructuredLookupError = _create_structured_error(LookupError, "StructuredLookupError")
StructuredMemoryError = _create_structured_error(MemoryError, "StructuredMemoryError")

__all__ = [
    "StructuredException",
    "StructuredKeyError",
    "StructuredTabError",
    "StructuredNameError",
    "StructuredTypeError",
    "StructuredValueError",
    "StructuredIndexError",
    "StructuredBufferError",
    "StructuredEOFError",
    "StructuredImportError",
    "StructuredLookupError",
    "StructuredMemoryError",
]