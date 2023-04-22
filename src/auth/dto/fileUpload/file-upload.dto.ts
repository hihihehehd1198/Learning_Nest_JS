import { Field, InputType } from "@nestjs/graphql";




@InputType()
export class FileUploadDTO {
    @Field()
    file: string

    @Field()
    fileName: string

}