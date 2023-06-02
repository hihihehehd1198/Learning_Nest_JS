import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../../modules/user/user.entity'

@ObjectType()
export class SignResponse {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;

    @Field(() => User, { nullable: true })
    user?: User
}