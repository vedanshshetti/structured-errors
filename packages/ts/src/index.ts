/**
 * A standardized error class that enforces a consistent structure for debugging and logging.
 * 
 * This class extends the native Error object to ensure compatibility with existing
 * try/catch blocks while adding machine-readable fields like timestamps and error codes.
 */
export = class StructuredError extends Error implements Error {
    /**
     * An ISO-8601 formatted timestamp indicating exactly when the error was instantiated.
     * @example "2026-10-18T14:30:00.000Z"
     */
    public readonly timestamp: string;

    /**
     * A machine-readable code used for programmatic error handling and filtering.
     * You can make this ny format you want:
     * @example "AUTH_TOKEN_EXPIRED", "HTTP/401" to keep it classical, or your own format like "MyOwNFoRmAT#123".
     */
    public readonly errCode: string;

    /**
     * Creates a new instance of StructuredError.
     * 
     * @param message - A human-readable description of the error.
     * @param errorCode - A machine-readable identifier for the error type.
     * @param cause - An optional underlying cause (e.g., another Error object) for error chaining.
     */
    constructor(message: string, errorCode: string, cause?: unknown) {
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
    public to(format: "json" | "string"): string | {
                name: string,
                message: string,
                errCode: string,
                timestamp: string,
                stack: string | undefined,
                cause: unknown
            } {
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