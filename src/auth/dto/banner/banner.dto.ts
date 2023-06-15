import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class BannerDto {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  urlImg?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  userId?: number;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;

  @Field()
  status: boolean;
}
