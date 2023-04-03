import { Category } from './../category/category.entity';
import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { BrandDto } from 'src/auth/dto/brands/brand.dto';
import { Brand } from '../brands/brand.entity';
// import { ProductCategory } from '@prisma/client';

@ObjectType()
export class Product {
    @Field(() => Int!, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    price: number;

    @Field()
    name: string;

    @Field(() => Float)
    count: number

    @Field({ nullable: true })
    location?: string

    @IsOptional()
    @Field({ nullable: true })
    Brand?: Brand


    @IsOptional()
    @Field(() => [Category], { nullable: true })
    Category?: Category[]
}
