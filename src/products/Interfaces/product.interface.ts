import { Document } from "mongodb";


export interface ProductInterface extends Document{
    name : string;
    type : string;
    price : number;
}