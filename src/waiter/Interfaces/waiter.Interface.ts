import { Document } from "mongodb"; 

export interface WaiterInterface extends Document {

    readonly first : string;
    readonly last : string;
    readonly joined_at : string;
    readonly money : number;
}