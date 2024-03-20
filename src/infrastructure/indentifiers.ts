import { isSymbol } from "lodash";

const Identifiers: {
  Logger: symbol;
  DynamoGateway: symbol;
  S3Gateway: symbol;
} = {
  DynamoGateway: Symbol.for("dynamoGateway"),
  Logger: Symbol.for("logger"),
  S3Gateway: Symbol.for("s3Gateway"),
};

export { Identifiers };
