// import { Field, InputType, Int } from '@nestjs/graphql';
// import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';

@InputType()
export class OrderProductDto {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  count: number;

  @Field(() => Float)
  price: number;
}
// @InputType()
// export class ArticleDto {
//   @Field(() => Int, { nullable: true })
//   id?: number;

//   @Field(() => String!, { nullable: true })
//   title?: string;

//   @Field(() => String, { nullable: true })
//   body?: string;
// }

@InputType()
export class OrderDTO {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  orderStatus?: OrderStatus;

  @Field(() => Int)
  customerId: number;

  @Field()
  paymentStatus: boolean;

  // @Field(() => Float)
  // totalPrice: number
  @Field(() => [OrderProductDto], { nullable: true })
  listProductId?: OrderProductDto[];
}
