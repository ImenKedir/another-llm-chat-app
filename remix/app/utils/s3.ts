export function formatS3ImageUrl(
  key: string,
  bucket: string,
  size: "sm" | "lg" = "lg",
) {
  if (size === "sm") {
    return `https://${bucket}.s3.us-west-1.amazonaws.com/resized-50w50h-${key}`;
  }

  return `https://${bucket}.s3.us-west-1.amazonaws.com/resized-400w225h-${key}`;
}
