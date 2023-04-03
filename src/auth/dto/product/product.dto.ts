import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsOptional } from "class-validator";





@InputType()
export class ProductBodyDTO {
    @Field(() => Int, { nullable: true })
    id?: number

    @Field(() => String)
    name: string

    @Field(() => Int)
    count: number

    @Field(() => Float)
    price: number

    @Field()
    location: string

    @Field(() => Int, { nullable: true })
    brandId?: number

    @Field(() => [Int!], { nullable: true })
    categoryId?: number[]
}