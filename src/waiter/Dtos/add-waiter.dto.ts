import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class WaiterInfoDto {

    @Field()
    first : string;
    
    @Field()
    last : string;
 
    @Field(() => Int , {nullable : true})
    numero_tel ?: number
}
