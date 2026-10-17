from datetime import datetime

def iso8601() -> str: return datetime.now().isoformat()

__all__ = ["iso8601"]