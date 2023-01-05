import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class BannerDto {
  @Field()
  id?: number;

  @Field()
  @IsOptional()
  urlImg?: string;

  @Field()
  @IsOptional()
  userId?: number;
}
