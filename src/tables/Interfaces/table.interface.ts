import { Document } from "mongodb";
import { AddProductInput, Status } from "src/grahql";
import { WaiterEntity } from "src/waiter/waiter.entity";

export interface TableInterface extends Document {
    number : number;
    status : Status;
    orderedProducts : AddProductInput[];
    waiter : WaiterEntity;
    money : number;

} 