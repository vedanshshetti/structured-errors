# Specsheet

Every Error Object / String should:

1. Contain a `timestamp` property or field, as a UTC ISO-8601 String
2. Contain an error code for machines and automated systems, in following format:
  UPPERCASE `[domain]/[error]`, for example: `HTTP/401` or `DATABASE/CONNECTION_TIMEOUT`,
  the user can choose, but it must be Uppercase
3. A human readable error message, clearly describing what the error is
4. A stack trace if available, or else a fallback message explaining that a stack trace is unavailable
5. And optionally language-specific properties if applicable, e.g. `cause` in JavaScript / TypeScript

This is supposed to help with debugging errors and more importantly, set a standard across the software development
industry for error handling.
