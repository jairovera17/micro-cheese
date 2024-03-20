import { IDynamoGateway } from "../../gateway/DynamoGateway/interfaces";
import BaseContainer from "../../infrastructure/container";
import { Identifiers } from "../../infrastructure/indentifiers";
import { v4 as uuidv4 } from "uuid";

const dynamoGateway = BaseContainer.get<IDynamoGateway>(
  Identifiers.DynamoGateway
);

async function putUser(event): Promise<{ id: string }> {
  const { body } = event;
  const id = uuidv4();

  await dynamoGateway.putItem({
    Item: {
      createdAt: new Date().getTime(),
      email: body.email,
      id: uuidv4(),
      name: body.name,
    },
    TableName: process.env.DYNAMO_USER_TABLE_NAME,
  });

  return {
    id,
  };
}

export { putUser };
