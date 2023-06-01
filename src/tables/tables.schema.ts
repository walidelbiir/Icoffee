import * as mongoose from "mongoose"
import { productsSchema } from "src/products/products.schema"
import { WaiterSchema } from "src/waiter/waiter.schema"


export const TableSchema = new mongoose.Schema({
    number: Number,
    status: String,
    orderedProducts: [productsSchema],
    waiter : WaiterSchema,
    money : Number,
}) 