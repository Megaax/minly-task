class AppError extends Error {
    statusCode?: number;
    statusText?: string;
  
    constructor(message?: string, statusCode?: number, statusText?: string) {
      super(message);
      this.statusCode = statusCode;
      this.statusText = statusText;
    }
  
    static create(message: any, statusCode: number, statusText: string): AppError {
      return new AppError(message, statusCode, statusText);
    }
  }
  
  export default AppError;