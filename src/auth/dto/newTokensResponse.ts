import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class NewTokensResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @IsOptional()
  @Field({ nullable: true })
  requireChangePassword?: boolean;
}
