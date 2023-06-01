import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddProductInput, ModifyTableInput, Status, Table, Waiter } from 'src/grahql';
import { WaiterInfoDto } from 'src/waiter/Dtos/add-waiter.dto';
import { WaiterEntity } from 'src/waiter/waiter.entity';
import { UpdateTableDto } from './Dtos/update-table.dto';
import { TableInterface } from './Interfaces/table.interface';
import { TableEntity } from './table.entity';

@Injectable()
export class TablesService {
   

    constructor(@InjectModel('Table') private readonly TableModel : Model<TableInterface> ) {}

    
    async getTables () {
        return await this.TableModel.find().exec();
    }

    async getLatestNumber() {
        return (await this.TableModel.find().exec()).length + 1;
    }

    async getTableByNumber(number : Number) {
        return await this.TableModel.findOne({number}).exec();
    }

    async getProdcuts(number : number) {
        return await (await this.TableModel.findOne({number}).exec()).toObject().orderedProducts;
    }
    
    async addTable() {
        const table = new TableEntity({number : null , orderedProducts :  [] , status : null ,waiter :  null , money :0})
        const status = Status.free
        table.setStatus(status);
        table.setNumber(await this.getLatestNumber());
        return await this.TableModel.create(table);
    }

    async ChangeStatus(number : number ,newStatus: Status){
        const table = await this.getTableByNumber(number);
        table.status = newStatus;
        return table;
    }

    async addProduct(number : number ,product : AddProductInput){
        const table = await this.getTableByNumber(number);
        table.orderedProducts.push(product);
        table.money += product.price;
        return product;
    }
    
    async UpdateTable(num : number , input : UpdateTableDto) {
        const table =  await this.getTableByNumber(num)
        const {waiter , number , orderedproducts , status , money } = input
        if(number) table.number = number
        if(waiter) {
            table.waiter = waiter
        }
        if(orderedproducts){ 
            const copy = JSON.parse(JSON.stringify(orderedproducts)) as typeof orderedproducts;
            table.orderedProducts = copy;}
        if(status) table.status = status
        if(money)  table.money = money;
        return await table.save()
    }
    
    async RemoveTable ( number : number ) {
        try {
        const tables = await this.TableModel.find({number : {$gt: number}}).exec()
        tables.forEach(element => {
        this.UpdateTable(element.number , {number : element.number - 1})
        });
        await this.TableModel.deleteOne({number}).exec()}
        catch(err) {return false}
        return true
    }

    async getWaiter(number : number) {
        const table = await this.getTableByNumber(number);
        if(table.waiter) return table.waiter 
        return null   
    }

    async getTablesByWaiter( input : WaiterInfoDto){
        return await this.TableModel.find({'waiter.firstname' : input.first , 'waiter.lastname' : input.last})
    }

    async removeProduct(number : number ,product : AddProductInput ){
        const table = (await this.getTableByNumber(number)).toObject()
        for(var i = 0; i <table.orderedProducts.length ; i++) {
            if(table.orderedProducts[i].name === product.name)
            table.orderedProducts.splice(i, 1);
        }
        table.money -= product.price;
       return await this.UpdateTable(number , table)
    }
}
 