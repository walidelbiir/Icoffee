import { Float } from "@nestjs/graphql";
import * as mongoose from "mongoose";


export const productsSchema = new mongoose.Schema({
    name : String,
    type : String,
    price : Number,
}) 