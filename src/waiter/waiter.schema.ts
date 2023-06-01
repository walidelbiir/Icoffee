import { Float } from "@nestjs/graphql";
import * as mongoose from "mongoose";

import { TableSchema } from "src/tables/tables.schema";

export const WaiterSchema = new mongoose.Schema({

    firstname : String,
    lastname : String,
    joined_at : String,
    numero_tel : Number,
    money : Number,
})