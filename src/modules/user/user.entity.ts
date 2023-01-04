import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String!, { nullable: true })
  username?: string;
  @Field(() => String!, { nullable: true })
  email?: string;
  @Field(() => String!, { nullable: true })
  Role?: string;

  @Field(() => String!, { nullable: true })
  PhoneNumber?: string;
}
