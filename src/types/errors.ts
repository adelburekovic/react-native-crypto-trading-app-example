export class BitcoinBaseError extends Error {
    public readonly cause?: Error;
  
    constructor(message: string, cause?: Error) {
      super(message);
      this.name = this.constructor.name;
      if (cause) this.cause = cause;
    }
  }
  
  export class NetworkError extends BitcoinBaseError {
    constructor(message: string = 'Network connection failed', cause?: Error) {
      super(message, cause);
    }
  }
  
  export class APIError extends BitcoinBaseError {
    constructor(
      message: string,
      public readonly statusCode: number,
      cause?: Error
    ) {
      super(`API Error (${statusCode}): ${message}`, cause);
    }
  }
  
  export class DataFormatError extends BitcoinBaseError {
    constructor(message: string = 'Invalid data format received', cause?: Error) {
      super(message, cause);
    }
  }
  
  export class NoDataError extends BitcoinBaseError {
    constructor(message: string = 'No data available', cause?: Error) {
      super(message, cause);
    }
  }
  
  export class PriceFormatError extends BitcoinBaseError {
    constructor(message: string = 'Invalid price format', cause?: Error) {
      super(message, cause);
    }
  }