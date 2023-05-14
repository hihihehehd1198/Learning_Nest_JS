import { ConfigService } from '@nestjs/config';
import { ERROR_RESPONSE, FileBody, GET_PRESIGN_URL_S3, UPLOAD_FILE_S3 } from './utils';


export class AWSService {
    constructor(private configService: ConfigService) { }


    async uploadFileToS3(body: Pick<FileBody, 'file' | 'fileName'>) {

        try {
            const contentType = "image/jpeg"
            const region = "ap-southeast-1"
            const bucket = "uploadfileionic"
            const data: FileBody = {
                file: body.file,
                fileName: body.fileName,
                bucket,
                region,
                contentType,
            }
            return await UPLOAD_FILE_S3(data)
        } catch (error) {
            ERROR_RESPONSE(error)
        }
    }
    async getURLS3(body: Pick<FileBody, 'fileName'>) {
        try {
            const bucket = "uploadfileionic"
            const region = "ap-southeast-1"
            const data = {
                bucket,
                fileName: body.fileName,
                region
            }
            const res = await GET_PRESIGN_URL_S3(data)
            if (res.toString().length) {
                const lastindexOf = res.toString().lastIndexOf('?AWSAccessKeyId')
                console.log('lastIndexOf', lastindexOf)
                return res.substring(0, lastindexOf)
            }
            return res;
        } catch (error) {
            ERROR_RESPONSE(error)
        }
    }
}