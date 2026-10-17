/**
 * A standardized error class that enforces a consistent structure for debugging and logging.
 * 
 * This class extends the native Error object to ensure compatibility with existing
 * try/catch blocks while adding machine-readable fields like timestamps and error codes.
 */
class StructuredError extends Error {
    /**
     * Creates a new instance of StructuredError.
     * 
     * @param message - A human-readable description of the error.
     * @param errorCode - A machine-readable identifier for the error type.
     * @param cause - An optional underlying cause (e.g., another Error object) for error chaining.
     */
    constructor(message, errorCode, cause) {
        super(message, { cause });
        
        // Explicitly set the name to distinguish it from standard Errors in logs
        this.name = 'StructuredError';
        
        // Capture the current time in ISO-8601 format
        this.timestamp = new Date().toISOString();
        
        // Assign the machine-readable code
        this.errCode = errorCode;
    }

    /**
     * Converts the error into a specific format for logging or API responses.
     * 
     * @param format - The desired output format:
     *   - "json": Returns a structured object suitable for APIs or monitoring dashboards.
     *   - "string": Returns a human-readable string suitable for console logs.
     * @returns A string or an object containing the error details.
     * 
     * @example
     * const err = new StructuredError("File missing", "IO_ERR");
     * console.error(err.to("string")); // [2026-10-18T...]: "IO_ERR" - "File missing" @ ...
     */
    to(format) {
        if (format === "json") {
            return {
                name: this.name,
                message: this.message,
                errCode: this.errCode,
                timestamp: this.timestamp,
                stack: this.stack,
                cause: this.cause
            };
        } else {
            // Fallback for environments where stack might be undefined
            const stackTrace = this.stack || 'No stack trace available';
            return `[${this.timestamp}]: "${this.errCode}" - "${this.message}" @ ${stackTrace}`;
        }
    }
}

if (typeof window !== 'undefined') {
    window.StructuredError = StructuredError;
}