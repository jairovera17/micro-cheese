import {
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from "@aws-sdk/client-s3";

export interface IS3Gateway {
  putItem(payload: PutObjectCommandInput): Promise<PutObjectCommandOutput>;
}
