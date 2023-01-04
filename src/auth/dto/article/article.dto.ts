import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class ArticleDto {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String!, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  body?: string;
}
