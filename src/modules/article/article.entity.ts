import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class Article {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String!)
  title?: String;

  @Field(() => String!)
  body?: String;
}
