import "reflect-metadata";
import middy from "@middy/core";
import { BuildDynamoEvent } from "middleware/buildDynamoEvent";
import { InputLogs } from "middleware/InputLog";
import { saveUserAsJson } from "./service";

const handler = middy(saveUserAsJson).use(InputLogs()).use(BuildDynamoEvent());

export { handler };
