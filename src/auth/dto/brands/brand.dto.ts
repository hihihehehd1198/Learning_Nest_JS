import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, isString } from 'class-validator';

type statusBrand = 'Enable' | 'Disable';

@InputType()
export class BrandDto {
  @Field({ nullable: true })
  id?: number;

  @Field()
  @IsString()
  brandName: string;

  @Field()
  status: statusBrand;
}
