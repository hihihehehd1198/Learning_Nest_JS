import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String!, { nullable: true })
  name?: string;
  @Field(() => String!, { nullable: true })
  email?: string;

  @Field(() => String!, { nullable: false })
  accountName: string;

  @Field(() => String!, { nullable: true })
  PhoneNumber?: string;

  @Field(() => String!, { nullable: true })
  hashedPassword?: string;

  @Field(() => String!, { nullable: true })
  address?: string;
}
