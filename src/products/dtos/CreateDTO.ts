import { Field, Float, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class CreateDTO {

   @Field()
   readonly name: string;
   @Field()
   readonly type: string;
   @Field(() => Float)
   readonly price: number;
}
