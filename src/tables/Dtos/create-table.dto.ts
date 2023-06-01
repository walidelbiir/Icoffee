import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { Status, WaiterInput } from "src/grahql";
import { ModifyProductDTO } from "src/products/dtos/modify-product.dto";
import { WaiterEntity } from "src/waiter/waiter.entity";

@ObjectType()
export class AddTableDTO {

    @Field(() => Int)
    number : number;

    @Field()
    status : Status;

    @Field()
    orderedproducts : [ModifyProductDTO];

    @Field()
    waiter : WaiterInput;

    @Field(() => Float)
    money : number
}