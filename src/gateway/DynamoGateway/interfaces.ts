import { PutCommandInput, PutCommandOutput } from "@aws-sdk/lib-dynamodb";

interface IDynamoGateway {
  putItem(input: PutCommandInput): Promise<PutCommandOutput>;
}

export type { IDynamoGateway };
