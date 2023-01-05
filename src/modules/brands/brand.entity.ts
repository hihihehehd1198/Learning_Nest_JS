import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString, isString } from 'class-validator';

type statusBrand = 'Enable' | 'Disable';

@ObjectType()
export class Brand {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  brandName: String;

  @Field()
  @IsBoolean()
  status: statusBrand;
}
