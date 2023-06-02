import { Field, ObjectType, PartialType } from "@nestjs/graphql";
import { WaiterEntity } from "../waiter.entity";

@ObjectType()
export class ModifyWaiterDTO extends PartialType(WaiterEntity) {
    

} 