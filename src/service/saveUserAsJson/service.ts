import { IS3Gateway } from "../../gateway/S3Gateway/interfaces";
import BaseContainer from "../../infrastructure/container";
import { Identifiers } from "../../infrastructure/indentifiers";

const s3Gateway = BaseContainer.get<IS3Gateway>(Identifiers.S3Gateway);

async function saveUserAsJson(event) {
  const user = event.dynamodb.NewImage;

  console.log(user);

  const jsonString = JSON.stringify(user);
  const stream = Buffer.from(jsonString);

  await s3Gateway.putItem({
    Body: stream,
    Bucket: process.env.S3_BUCKET_NAME,
    ContentType: "application/json; charset=utf-8",
    Key: user.id,
  });
}

export { saveUserAsJson };
