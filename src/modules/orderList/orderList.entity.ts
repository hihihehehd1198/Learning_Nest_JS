import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { OrderStatus, Product } from "@prisma/client";





@ObjectType()
export class ProductOrder {
    @Field()
    id: number

    @Field()
    name: string

    @Field()
    count: number

    @Field()
    price: number
}



@ObjectType()
export class Order {
    @Field(() => Int!, { nullable: true })
    id?: number;

    @Field(() => String, { nullable: true })
    orderStatus?: OrderStatus

    @Field()
    paymentStatus: boolean


    @Field()
    createdAt: Date

    // @Field(() => Float, { nullable: true })
    // totalPrice?: number


    @Field()
    customerName: string

    @Field(() => [ProductOrder], { nullable: true })
    productOrder?: ProductOrder[]
}