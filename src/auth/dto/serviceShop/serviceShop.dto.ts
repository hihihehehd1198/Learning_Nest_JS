import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';

@InputType()
export class ServiceShopDTO {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  price?: number;

  @Field()
  name: string;
}
