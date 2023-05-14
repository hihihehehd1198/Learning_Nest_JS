import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString, isString } from 'class-validator';
import { type } from 'os';

type BrandStatus = "ENABLED" | "DISABLED"


@ObjectType()
export class Brand {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  brandName: String;

  @Field()
  status?: BrandStatus
}
