import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class CustomerDto {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: false })
  accountName: string;

  @Field({ nullable: true })
  PhoneNumber?: string;

  @Field({ nullable: true })
  hashedPassword?: string;

  @Field({ nullable: true })
  address?: string;
}
