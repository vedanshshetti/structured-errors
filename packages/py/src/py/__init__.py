from .utils import iso8601

class StructuredError(Exception):
    def __init__(self, message: str, error_code: str):
        # Pass the message to the parent Exception class
        super().__init__(message)
        
        # Store your custom fields
        self.timestamp = iso8601()
        self.error_code = error_code

__all__ = ["StructuredError"]