import { injectable } from "inversify";
import { ILogger } from "./interfaces";
import { LogLevel } from "./constants";

@injectable()
export class Logger implements ILogger {
  private static _buildMessage(
    logLevel: LogLevel,
    message: string | Error,
    fullLog: boolean,
    data?: object
  ): string {
    try {
      const output = `${logLevel} ${message}`;

      if (typeof data === "object") {
        return `${output} \n${JSON.stringify(data, function (k, v) {
          if (fullLog) return v;
          if (v instanceof Array) return v.slice(0, 5);

          return v;
        })}`;
      }

      return output;
    } catch (e) {
      return `Logger Error: ${e.message}`;
    }
  }

  public log(message: string, data?: object, fullLog: boolean = false): void {
    console.log(Logger._buildMessage(LogLevel.LOG, message, fullLog, data));
  }

  public info(message: string, data?: object, fullLog: boolean = false): void {
    console.info(Logger._buildMessage(LogLevel.INFO, message, fullLog, data));
  }

  public warn(message: string, data?: object, fullLog: boolean = false): void {
    console.warn(
      Logger._buildMessage(LogLevel.WARNING, message, fullLog, data)
    );
  }

  public error(
    message: string,
    data?: object | Error,
    fullLog: boolean = false
  ): void {
    console.error(Logger._buildMessage(LogLevel.ERROR, message, fullLog, data));
  }
}
