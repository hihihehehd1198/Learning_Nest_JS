import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageEntity {
  //   @Field()
  //   id: number;
  //   @Field()
  //   name: string;
  //   @Field()
  //   status: boolean;

  @Field()
  response: string;
}
