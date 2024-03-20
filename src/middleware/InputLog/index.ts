import { MiddlewareObj } from "@middy/core";
import { get } from "lodash";
import BaseContainer from "../../infrastructure/container";
import { Identifiers } from "../../infrastructure/indentifiers";
import { ILogger } from "../../utils/Logger/interfaces";

const logger = BaseContainer.get<ILogger>(Identifiers.Logger);

export function InputLogs(): MiddlewareObj<any> {
  return {
    after: async (request): Promise<void> => {
      try {
        logger.log("MIDDY | InputLogs | after", {
          event: request.response,
        });
      } catch (e) {
        logger.error(e);
      }
    },
    before: async (request): Promise<void> => {
      try {
        const isBase64: boolean = get(request, "event.isBase64Encoded", false);
        const eventBody: string = get(request, "event.body", "");
        const payloadBody = isBase64 ? Buffer.from(eventBody) : eventBody;

        const payload = {
          event: {
            ...request.event,
            body: payloadBody,
          },
        };

        logger.log("MIDDY | InputLogs | before", payload);
      } catch (e) {
        logger.error(e);
      }
    },
  };
}
