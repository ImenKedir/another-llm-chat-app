export function formatS3ImageUrl(key: string, size: "sm" | "lg" = "lg") {
  const bucket = "imenkedir-naughtyml-site-contentbucket87eb7f55-htjpchyq99jz";

  if (size === "sm") {
    return `https://${bucket}.s3.us-west-1.amazonaws.com/resized-50w50h-${key}`;
  }

  return `https://${bucket}.s3.us-west-1.amazonaws.com/resized-400w225h-${key}`;
}
