import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Banner {
  @Field()
  id?: number;

  @Field()
  @IsOptional()
  urlImg?: string;

  @Field({ nullable: true })
  @IsOptional()
  userId?: number;

  @Field({ nullable: true })
  @IsOptional()
  status?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  location?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
