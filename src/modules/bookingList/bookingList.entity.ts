import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { Customer } from "../customer/customer.entity";
import { ServiceShop } from "../serviceShop/serviceShop.entity";
import { User } from "../user/user.entity";





@ObjectType()
export class BookingList {
    @Field()
    id?: number

    @Field()
    user: User

    @Field()
    customer: Customer


    @Field()
    serviceShop: ServiceShop

    @Field(() => String)
    customerPhone: string

    @Field(() => Date)
    timeBooking: Date

}