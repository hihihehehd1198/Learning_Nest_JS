import { Type } from '@nestjs/common';
import {
    extend,
    Field,
    InputType,
    Int,
    ObjectType,
    OmitType,
    PartialType,
} from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { User } from '../../../modules/user/user.entity';
// import { User } from '../../../modules/user/user.entity'







@InputType()
export class UserUpdatePassDto {


    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
}
