import { Field, ObjectType, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CategoryDTO {
  @Field({ nullable: true })
  id?: number;
  @Field({ nullable: true })
  name?: string;
  @Field()
  status?: boolean;
}
