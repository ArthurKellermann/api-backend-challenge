export class AppError {
  public error;

  constructor(message: string, statusCode = 400) {
    this.error = {
      statusCode: statusCode,
      message: message,
    };
  }

  public get statusCode(): number {
    return this.error.statusCode;
  }

  public get message(): string {
    return this.error.message;
  }
}
