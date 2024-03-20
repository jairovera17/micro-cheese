import { Container } from "inversify";
import { DynamoGateway } from "../gateway/DynamoGateway";
import { IDynamoGateway } from "../gateway/DynamoGateway/interfaces";
import { S3Gateway } from "../gateway/S3Gateway";
import { IS3Gateway } from "../gateway/S3Gateway/interfaces";
import { Logger } from "../utils/Logger";
import { ILogger } from "../utils/Logger/interfaces";
import { Identifiers } from "./indentifiers";

const BaseContainer = new Container();

BaseContainer.bind<ILogger>(Identifiers.Logger).to(Logger);
BaseContainer.bind<IDynamoGateway>(Identifiers.DynamoGateway).to(DynamoGateway);
BaseContainer.bind<IS3Gateway>(Identifiers.S3Gateway).to(S3Gateway);

export default BaseContainer;
