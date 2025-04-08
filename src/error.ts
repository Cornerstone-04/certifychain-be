// custom error class
export class AppError extends Error {
  public statuscode: number;
  public isoperational: boolean;

  constructor(statuscode: number, message?: string, isoperational = true) {
    super(message);
    this.isoperational = isoperational;
    this.statuscode = statuscode;
  }
}
