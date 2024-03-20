import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { inject, injectable } from "inversify";
import { Identifiers } from "../../infrastructure/indentifiers";
import { ILogger } from "../../utils/Logger/interfaces";
import { IS3Gateway } from "./interfaces";

@injectable()
export class S3Gateway implements IS3Gateway {
  private readonly _client: S3Client;
  private readonly _logger: ILogger;

  public constructor(@inject(Identifiers.Logger) _logger: ILogger) {
    this._client = new S3Client({});
    this._logger = _logger;
  }

  public async putItem(
    payload: PutObjectCommandInput
  ): Promise<PutObjectCommandOutput> {
    this._logger.log("S3Gateway | putItem | start | ", payload);

    const response = await this._client.send(
      new PutObjectCommand({
        ...payload,
      })
    );

    this._logger.log("S3Gateway | putItem | end | ", response);
    return response;
  }
}
