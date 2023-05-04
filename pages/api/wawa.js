import S3 from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const s3 = new S3({
        signatureVersion: 'v4',
        region: 'us-east-1',
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    })

    const preSignedUrl = await s3.getSignedUrl("putObject", {
        Bucket: process.env.wawa_calc,
        Key: req.query.file,
        ContentType: req.query.fileType,
        Expires: 5 * 60
    })
    res.status(200).json({
        "url": preSignedUrl
    })
}