import { ObjectType, PartialType } from "@nestjs/graphql";
import { CreateDTO } from "./CreateDTO";

@ObjectType()
export class ModifyProductDTO extends PartialType(CreateDTO){}