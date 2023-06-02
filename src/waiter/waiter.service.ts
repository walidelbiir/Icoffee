import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status} from 'src/grahql';
import { ProductsService } from 'src/products/products.service';
import { TableEntity } from 'src/tables/table.entity';
import { TablesService } from 'src/tables/tables.service';
import { WaiterInfoDto } from './Dtos/add-waiter.dto';
import { ModifyWaiterDTO } from './Dtos/modify-waiter.dto';
import { WaiterInterface } from './Interfaces/waiter.Interface';
import { WaiterEntity } from './waiter.entity';
import { WaiterResolver } from './waiter.resolver';


@Injectable()
export class WaiterService {
    
    constructor(@InjectModel('Waiter') private readonly WaiterModel : Model<WaiterInterface>,
    private readonly TableService : TablesService,
    private readonly ProductService : ProductsService
    ){}

    async getWaiters() {
        return await this.WaiterModel.find().exec()
    }

    async getWaitersCount() {
        return (await this.getWaiters()).length
    }

    async getWaiterByName(name : {first : string , last : string} ) {
        return await this.WaiterModel.findOne({firstname : name.first, lastname : name.last}).exec();
    }

    async addWaiter(input : WaiterInfoDto) {
        const joined = {joined_at : new Date().toISOString()}
        const infos = {firstname : input.first , lastname : input.last , numero_tel : input.numero_tel}
        var waiter = Object.assign({} , infos , joined )
        const createdwaiter =  new this.WaiterModel(waiter)
        return await createdwaiter.save()
    }


    async updateWaiter(infoinput : WaiterInfoDto , modifyinput : ModifyWaiterDTO) {
        const waiter = new WaiterEntity((await this.getWaiterByName({first : infoinput.first , last : infoinput.last})).toObject())
        if(modifyinput.first)
            waiter.setfirstname(modifyinput.first)
        if(modifyinput.last)
            waiter.setlastname(modifyinput.last)
        if(modifyinput.joined_at)  
            waiter.setjoinedat(modifyinput.joined_at)
        if(modifyinput.numero_tel)
            waiter.setnumero_tel(modifyinput.numero_tel)
        if(modifyinput.money)
            waiter.setmoney(modifyinput.money)

        return await this.WaiterModel.findOneAndReplace({firstname : infoinput.first , lastname : infoinput.last} , waiter);
    }


    async removeWaiter(input : WaiterInfoDto ) {
        (await this.TableService.getTablesByWaiter(input)).forEach(
            (table) => {
                this.TableService.UpdateTable(table.number , {waiter : null})  
            }
        )
        return await this.WaiterModel.deleteOne({firstname : input.first , lastname : input.last}).exec()
    } 

    async assignTable(waiter : WaiterInfoDto , number : number) {
        if(number >= await this.TableService.getLatestNumber()) throw new Error("number is out of range")
        return await this.TableService.UpdateTable(number , {waiter : waiter})
    }

    async verifyWaiterTable (nameWaiter : {first : string , last :string}, number :number) : Promise<boolean> {
        const tables = [];
        (await this.TableService.getTablesByWaiter({first : nameWaiter.first , last : nameWaiter.last})).forEach(
            (table) => {
                tables.push(table.toObject())
            }
        )
        if(tables.includes({number : number})) return true
        return false
    }

    async verifyProductTable(name : string , number : number) : Promise<boolean> {
        const product = (await this.ProductService.getProductByName(name)).toObject()
        if((await this.TableService.getProdcuts(number)).includes(product)) return true
        return false
    }
    async verifyTableOCcupied(number : number) {
        return((await this.TableService.getTableByNumber(number)).toObject().status === Status.occupiedNotPaid)
    }

    async addProduct(nameWaiter : {first : string , last: string} ,name : string ,number : number) {
        if(await this.verifyWaiterTable(nameWaiter , number)) {
        const product =  (await this.ProductService.getProductByName(name)).toObject()
        await this.TableService.addProduct(number , product)
        return true
    }else { return false}
    }

    async RemoveProduct(nameWaiter : {first : string , last: string} ,name : string ,number : number ) {
        if(this.verifyWaiterTable(nameWaiter ,number) && this.verifyProductTable(name , number)){
            const product = (await this.ProductService.getProductByName(name)).toObject()
            this.TableService.removeProduct(number , product)
            return true;
        } else return false;
    }

    async confirmCommand(namewaiter : {first : string , last: string},number : number) {
        if( await this.verifyWaiterTable(namewaiter , number)){
            const table = new TableEntity((await this.TableService.getTableByNumber(number)).toObject());
            table.setStatus(Status.occupiedNotPaid);
            const waiter = new WaiterEntity((await this.getWaiterByName(namewaiter)).toObject());
            waiter.money += table.money;
            this.updateWaiter({first : namewaiter.first , last : namewaiter.last} , waiter)
            return true;
        }
        else return false;
    }
    

    async markTablePaid(namewaiter : {first : string , last : string } , number : number) {
        if(this.verifyTableOCcupied(number) && this.verifyWaiterTable(namewaiter , number)){
            const table = (await this.TableService.getTableByNumber(number))
            table.status = Status.occupiedPaid;
            const waiter = new WaiterEntity( (await this.getWaiterByName(namewaiter)).toObject())
            waiter.setmoney(waiter.money + table.money)
            this.updateWaiter({first : namewaiter.first , last : namewaiter.last} , waiter)
            return true
        } else return false

    }

    async clearTable(number : number , namewaiter : {first : string , last: string}){
        if(await this.verifyWaiterTable(namewaiter , number)){
            const table = (await this.TableService.getTableByNumber(number)).toObject();
            table.orderedProducts = [];
            table.money = 0;
            table.status = Status.free
            return await this.TableService.UpdateTable(number , table);
            return true;
        } else {
            return false;
        }
    }



}
