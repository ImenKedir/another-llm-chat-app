import { ActionFunctionArgs, json } from "@remix-run/node";
import { requireAuth } from "@/sessions.server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/s3.server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Bucket } from "sst/node/bucket";

export async function action({ request }: ActionFunctionArgs) {
  await requireAuth(request);

  const key = crypto.randomUUID();

  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: key,
    Bucket: Bucket.content.bucketName,
  });

  const url = await getSignedUrl(s3, command);

  return json({ fileUploadUrl: url, imageId: key });
}
