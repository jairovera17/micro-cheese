import "reflect-metadata";
import middy from "@middy/core";
import { BuildApiGatewayEvent } from "middleware/buildApiGatewayEvent";
import { ContentTypeEnum } from "middleware/buildApiGatewayEvent/ContentTypeEnum";
import HttpStatusCode from "middleware/buildApiGatewayEvent/HttpCodeEnum";
import { HttpErrorMiddleware } from "middleware/httpErrorMiddleware";
import {InputLogs} from "middleware/InputLog";
import { putUser } from "./service";

const handler = middy(putUser).use(InputLogs())
  .use(
    BuildApiGatewayEvent({
      cors: true,
      requestType: ContentTypeEnum.JSON,
      responseCode: HttpStatusCode.OK,
      responseType: ContentTypeEnum.JSON,
    })
  )
  .use(HttpErrorMiddleware());

export { handler };
