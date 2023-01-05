import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class BannerDto {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  urlImg?: string;

  @Field({ nullable: true })
  @IsOptional()
  userId?: number;
}
