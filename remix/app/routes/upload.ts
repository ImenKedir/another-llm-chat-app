import { ActionFunctionArgs, json } from "@remix-run/node";
import { requireAuth } from "@/sessions.server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "s3/client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Bucket } from "sst/node/bucket";

export async function action({ request }: ActionFunctionArgs) {
  await requireAuth(request);

  const command = new PutObjectCommand({
    ACL: "public-read",
    Key: crypto.randomUUID(),
    Bucket: Bucket.naughtyml.bucketName,
  });

  const url = await getSignedUrl(s3Client, command);

  return json({ url });
}
