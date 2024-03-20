import { MiddlewareObj } from "@middy/core";
import BaseContainer from "../../infrastructure/container";
import { Identifiers } from "../../infrastructure/indentifiers";
import { ILogger } from "../../utils/Logger/interfaces";

const logger = BaseContainer.get<ILogger>(Identifiers.Logger);

function HttpErrorMiddleware(): MiddlewareObj<any> {
  return {
    onError: async (request): Promise<void> => {
      try {
        logger.error("MIDDY | Error | onError", request.error!);

        const error = request.error;

        const response = {
          body: JSON.stringify(error.message || "Unexpected Error"),
          headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
          },
          statusCode: 400,
        };

        request.response = response;

        logger.error("MIDDY | Error | onError | response", response);
      } catch (e) {
        logger.error("MIDDY | Error | criticalError");
      }
    },
  };
}

export { HttpErrorMiddleware };
