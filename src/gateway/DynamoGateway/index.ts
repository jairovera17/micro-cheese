import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { inject, injectable } from "inversify";
import { Identifiers } from "../../infrastructure/indentifiers";
import { ILogger } from "../../utils/Logger/interfaces";

import { IDynamoGateway } from "./interfaces";

@injectable()
export class DynamoGateway implements IDynamoGateway {
  private readonly _client: DynamoDBClient;
  private readonly _docClient: DynamoDBDocumentClient;
  private readonly _logger: ILogger;

  constructor(@inject(Identifiers.Logger) _logger: ILogger) {
    this._client = new DynamoDBClient();
    this._docClient = DynamoDBDocumentClient.from(this._client);
    this._logger = _logger;
  }

  public async putItem(input: PutCommandInput): Promise<PutCommandOutput> {
    this._logger.log("DynamoGateway | putItem | start | ", input);

    const response = await this._docClient.send(
      new PutCommand({
        ...input,
      })
    );

    this._logger.log("DynamoGateway | putItem | end | ", response);
    return response;
  }
}
