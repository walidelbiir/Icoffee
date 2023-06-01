import { AddProductInput, Product, Status, Table, Waiter } from "src/grahql";
import { ModifyProductDTO } from "src/products/dtos/modify-product.dto";
import { WaiterInfoDto } from "src/waiter/Dtos/add-waiter.dto";
import { WaiterEntity } from "src/waiter/waiter.entity";
import { TableInterface } from "./Interfaces/table.interface";




export class TableEntity implements TableInterface {


    constructor({ number , orderedProducts , status , waiter , money}) {
        this.number = number;
        const copy = JSON.parse(JSON.stringify(orderedProducts)) as typeof orderedProducts;
        this.orderedProducts = copy;
        this.status = status;
        this.waiter = waiter;
        this.money = money;
    }
    
    number : number;
    status : Status;
    orderedProducts : AddProductInput[];
    waiter : WaiterEntity;
    money : number;
    

    static possiblestatus : [String,String,String] = ["free" , "occupiedPaid" , "occupiedNotPaid"]

    // copyTableDoc({number ,orderedProducts , status, waiter}){
    //     this.setWaiter(waiter)
    //     this.setNumber(number)
    //     this.setStatus(status)
    //     const copy = JSON.parse(JSON.stringify(orderedProducts)) as typeof orderedProducts;
    //     this.orderedProducts = copy;
    // }
    // setWaiter(waiter : WaiterInfoDto ) {
    //     const entity = new WaiterEntity(waiter);
    //     this.waiter = entity;
    // }

    setNumber(number : number) {
        this.number = number;
        return 'number assigned successfully'
    }
    setStatus(newstatus : Status) {
        this.status = newstatus;
        return ' Status updated successfully'
    
}


    addProduct(product: AddProductInput ) {
        this.orderedProducts.push(product);
    }
    
}