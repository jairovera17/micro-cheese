import { MiddlewareObj } from "@middy/core";
import { ContentTypeEnum } from "middleware/buildApiGatewayEvent/ContentTypeEnum";
import HttpStatusCode from "middleware/buildApiGatewayEvent/HttpCodeEnum";
import BaseContainer from "../../infrastructure/container";
import { Identifiers } from "../../infrastructure/indentifiers";
import { ILogger } from "../../utils/Logger/interfaces";

interface IBuilderApi {
  cors?: boolean | string;
  responseHeaders?: object;
  requestType?: ContentTypeEnum;
  responseCode?: HttpStatusCode;
  responseType?: ContentTypeEnum;
}

const logger: ILogger = BaseContainer.get<ILogger>(Identifiers.Logger);

const headersToUpperCase = (headers) => {
  if (!headers) return headers;

  const headersKeys = Object.keys(headers);

  const cleanedHeaders = {};

  headersKeys.forEach((key) => {
    const uppercasedKey: string = key.toUpperCase();

    cleanedHeaders[uppercasedKey] = headers[key];
  });

  return cleanedHeaders;
};

function BuildApiGatewayEvent({
  cors,
  responseHeaders,
  requestType = ContentTypeEnum.JSON,
  responseCode = HttpStatusCode.OK,
  responseType = ContentTypeEnum.JSON,
}: IBuilderApi): MiddlewareObj<any> {
  return {
    after: async (request): Promise<void> => {
      try {
        let isEncodedBase64 = false;
        let body: object | string;

        const headers: object = {
          "Content-Type": responseType,
        };

        if (responseHeaders !== undefined)
          for (const header of Object.keys(responseHeaders)) {
            headers[header] = request.response[responseHeaders[header]];
          }
        if (cors) {
          headers["Access-Control-Allow-Origin"] =
            typeof cors === "boolean" ? "*" : cors;
          headers["Access-Control-Allow-Credentials"] = true;
        }

        switch (responseType) {
          case ContentTypeEnum.JSON:
            body = JSON.stringify(request.response);
            break;
          case ContentTypeEnum.HTML:
          case ContentTypeEnum.TEXT:
            body = request.response;
            break;
          default:
            body = (<Buffer>request.response).toString("base64");
            isEncodedBase64 = true;
            break;
        }

        request.response = {
          body,
          headers,
          isBase64Encoded: isEncodedBase64,
          statusCode: responseCode,
        };
      } catch (e) {
        logger.error(e);
      }
    },
    before: async (request): Promise<void> => {
      try {
        logger.log("MIDDY | BuilderApi | before | start");

        request.event.headers = headersToUpperCase(request.event.headers);
        if (request.event.isBase64Encoded) {
          const buffer: Buffer = Buffer.from(request.event.body, "base64");

          if (requestType === ContentTypeEnum.MULTIPART) {
            request.event.body = buffer;
          } else request.event.body = buffer.toString();
        }

        if (requestType === ContentTypeEnum.JSON)
          request.event.body = JSON.parse(request.event.body);

        logger.log("MIDDY | BuilderApi | before | parsed", {
          body: request.event.body,
          headers: request.event.headers,
          requestType,
        });
      } catch (e) {
        logger.error(e);
      }
    },
  };
}

export { BuildApiGatewayEvent };
