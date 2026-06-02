// custom error class
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.name = "AppError";
    this.isOperational = isOperational;
    this.statusCode = statusCode;
  }
}
