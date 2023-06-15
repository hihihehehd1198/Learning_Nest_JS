import { Field, ObjectType } from '@nestjs/graphql';
// import { User } from '../../user/user.entity'

@ObjectType()
export class LogOutResponse {
  @Field()
  message: string;

  @Field()
  loggedOut: boolean;
}
