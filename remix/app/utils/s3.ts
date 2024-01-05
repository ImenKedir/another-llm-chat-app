export function formatS3ImageUrl(
  key: string,
  bucket: string,
  size: "sm" | "md" | "lg" = "lg",
) {
  if (size === "sm") {
    return `https://${bucket}.s3.us-west-1.amazonaws.com/resized-50w50h-${key}`;
  }

  if (size === "md") {
    return `https://${bucket}.s3.us-west-1.amazonaws.com/resized-200w300h-${key}`;
  }

  return `https://${bucket}.s3.us-west-1.amazonaws.com/resized-400w225h-${key}`;
}
