export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational?: boolean;
  public context?: string;

  constructor(
    message: string,
    statusCode = 400,
    isOperational = true,
    context?: string,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }
}
