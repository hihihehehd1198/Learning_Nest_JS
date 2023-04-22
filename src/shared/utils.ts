import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
interface FileBody {
    file: string;
    fileName: string
    contentType?: string
    bucket: string
    region: string
}

const UPLOAD_FILE_S3 = async (body: FileBody) => {
    try {
        const { fileName, file, bucket, region } = body
        const s3 = new AWS.S3({
            region: region,
            credentials: {
                accessKeyId: "AKIA2II4BUFIGXCWVOW5",
                secretAccessKey: "3o3+KujxNzn+1I6DJm3dVK32iWF8Br3OZvSjbwMU",
            }
        })

        var buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64')

        const param: AWS.S3.PutObjectRequest = {
            Bucket: bucket,
            Key: fileName,
            ContentType: 'image/jpeg',
            Body: buf,
            ContentEncoding: 'base64',
        }
        // console.log('test', bucket, region)
        await s3.upload(param).promise()


        //get presign url 
        return 'ok'
    } catch (error) {
        ERROR_RESPONSE(error)
    }
};

const GET_PRESIGN_URL_S3 = async (body: Pick<FileBody, 'fileName' | 'bucket' | 'region'>) => {
    try {
        const getUrlParams = {
            Bucket: body.bucket,
            Key: body.fileName,
            Expires: 3600,
        }
        const s3 = new AWS.S3({
            region: body.region,
            credentials: {
                accessKeyId: "AKIA2II4BUFIGXCWVOW5",
                secretAccessKey: "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",
            }
        })
        const url = await s3.getSignedUrlPromise('getObject', getUrlParams)
        return url
    } catch (error) {
        ERROR_RESPONSE(error)
    }
}

// async getSignedUrl(fileName: string): Promise<string> {
//     if (!this.bucketName) return '';
//     const getUrlParams = {
//       Bucket: this.bucketName,
//       Key: fileName,
//       Expires: 3600,
//     };
//     try {
//       const url = await this.s3.getSignedUrlPromise('getObject', getUrlParams);
//       return url;
//     } catch (error: any) {
//       return '';
//     }
//   }

const ERROR_RESPONSE = (error?: string) => {
    throw error ? new Error(error) : new Error('khong tim thay ban ghi ');
};

export { ERROR_RESPONSE, UPLOAD_FILE_S3, GET_PRESIGN_URL_S3, FileBody, };
