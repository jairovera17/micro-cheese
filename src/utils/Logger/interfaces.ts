export interface ILogger {
  info(message: string, data?: object, fullLog?: boolean): void;
  log(message: string, data?: object, fullLog?: boolean): void;
  warn(message: string, data?: object, fullLog?: boolean): void;
  error(message: string, data?: object | Error, fullLog?: boolean): void;
}
