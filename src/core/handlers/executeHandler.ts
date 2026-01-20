import { AppError } from "../errors/AppError";

export class ExecuteHandler {
  constructor(
    private readonly defaultIsOperational: boolean = true,
    private readonly contextPrefix?: string,
  ) {}

  private formatContext(context: string): string {
    return this.contextPrefix
      ? `${this.contextPrefix}:${context}`
      : context;
  }

  public async repository<T>(
    fn: () => Promise<T | null>,
    message: string,
    context: string,
    isOperational?: boolean,
  ): Promise<T> {
    const finalContext = this.formatContext(context);

    try {
      const result = await fn();

      if (!result) {
        throw new AppError(
          message,
          404,
          isOperational ?? this.defaultIsOperational,
          finalContext,
        );
      }

      return result;
    } catch (error: any) {
      console.error(`Erro em ${finalContext}:`, error?.message, error?.stack);

      if (error instanceof AppError) throw error;

      throw new AppError(
        message,
        500,
        isOperational ?? this.defaultIsOperational,
        finalContext,
      );
    }
  }

  public async service<T>(
    fn: () => Promise<T>,
    message: string,
    context: string,
    isOperational?: boolean,
  ): Promise<T> {
    const finalContext = this.formatContext(context);

    try {
      return await fn();
    } catch (error: any) {
      console.error(`Erro em ${finalContext}:`, error?.message, error?.stack);

      if (error instanceof AppError) throw error;

      throw new AppError(
        message,
        500,
        isOperational ?? this.defaultIsOperational,
        finalContext,
      );
    }
  }
}
