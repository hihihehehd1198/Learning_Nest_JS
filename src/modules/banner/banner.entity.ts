import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Banner {
  @Field()
  id?: number;

  @Field()
  @IsOptional()
  urlImg?: string;

  @Field()
  @IsOptional()
  userId?: number;
  
}