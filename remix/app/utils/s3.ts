export function formatS3ImageUrl(key: string,) {
    const bucket = "imenkedir-naughtyml-site-contentbucket87eb7f55-vmcghvrqf1u9"

    return `https://${bucket}.s3.us-west-1.amazonaws.com/400w225h-${key}`
}