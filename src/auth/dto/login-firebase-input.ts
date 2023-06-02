import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
@InputType()
export class LoginFirebaseInput {


    @IsNotEmpty()
    @IsString()
    @Field()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    userName: string;
}
