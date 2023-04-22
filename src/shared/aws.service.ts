import { ConfigService } from '@nestjs/config';
import { FileBody, GET_PRESIGN_URL_S3, UPLOAD_FILE_S3 } from './utils';


export class AWSService {
    constructor(private configService: ConfigService) { }


    async uploadFileToS3(body: Pick<FileBody, 'file' | 'fileName'>) {

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
    }
    async getURLS3(body: Pick<FileBody, 'fileName'>) {
        const bucket = "uploadfileionic"
        const region = "ap-southeast-1"
        const data = {
            bucket,
            fileName: body.fileName,
            region
        }
        return await GET_PRESIGN_URL_S3(data)
    }
}