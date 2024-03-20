import { MiddlewareObj } from "@middy/core";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import BaseContainer from "../../infrastructure/container";
import { Identifiers } from "../../infrastructure/indentifiers";
import { ILogger } from "../../utils/Logger/interfaces";

const logger = BaseContainer.get<ILogger>(Identifiers.Logger);

function BuildDynamoEvent(): MiddlewareObj<any> {
  return {
    before: (request) => {
      logger.log("BuildDynamoEvent | before | start");
      const keys = ["Keys", "NewImage", "OldImage"];

      keys.forEach((key) => {
        if (request.event.dynamodb[key])
          request.event.dynamodb[key] = unmarshall(request.event.dynamodb[key]);
      });

      logger.log("BuildDynamoEvent | before | end");
    },
  };
}

export { BuildDynamoEvent };
