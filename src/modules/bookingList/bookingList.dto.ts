import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BookingListDTO {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Date)
  timeBooking: Date;

  @Field(() => Int)
  customerId: number;

  @Field(() => Int)
  serviceShopId: number;

  @Field(() => String)
  customerPhone: string;

  @Field(() => Int)
  userId: number;
}
