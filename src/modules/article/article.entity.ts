import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Article {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  title?: string | null;;

  @Field(() => String, { nullable: true })
  body?: string | null;
}
