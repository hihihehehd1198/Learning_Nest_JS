import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class ServiceShop {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  price?: number;

  @Field()
  name: string;
}
