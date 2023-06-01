import {ObjectType, PartialType } from "@nestjs/graphql";
import { AddTableDTO } from "./create-table.dto";

@ObjectType()
export class UpdateTableDto extends PartialType(AddTableDTO) {
   

}
