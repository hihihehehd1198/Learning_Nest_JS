import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsString, isString } from 'class-validator';

type BrandStatus = 'ENABLED' | 'DISABLED';

@InputType()
export class BrandDto {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  @IsString()
  brandName: string;

  @Field()
  status: BrandStatus;
}
