import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LocaleStringComparer } from '@ts-morph/common';
import { TablesService } from 'src/tables/tables.service';
import { WaiterInfoDto } from './Dtos/add-waiter.dto';
import { WaiterService } from './waiter.service';

@Resolver()
export class WaiterResolver {

    constructor(private readonly WaiterService : WaiterService,
        private readonly TableService : TablesService){}
    // AddWaiter(input : WaiterInput!) : Waiter!
    // RemoveWaiter(input : WaiterInput!) : Waiter! 
    // MarkTablePaid(input : WaiterInput! , number : Int!) : Boolean!
    // ClearTable(input : WaiterInput! , number : Int!) : Boolean!
    // ConfirmCommand(input : WaiterInput! , number : Int!) : Boolean!
    // AddProductTable(input : WaiterInput! ,name : String! , number : Int!) : Boolean!
    // RemoveProductTable(input : WaiterInput! , name: String! , number : Int!) : Boolean!
    @Mutation()
    async AdddWaiter(@Args('input') info : WaiterInfoDto) {
        return (await this.WaiterService.addWaiter(info)).toObject()
    }

    @Mutation()
    async RemoveWaiter(@Args('input') info : WaiterInfoDto) {
        return (await this.WaiterService.removeWaiter(info)).acknowledged;
    }

    @Mutation()
    async MarkTablePaid(@Args('input')input : WaiterInfoDto , @Args('number') number : number ) {
        return await this.WaiterService.markTablePaid(input , number)
    }

    @Mutation()
    async ClearTable(@Args('input')input : WaiterInfoDto , @Args('number')number : number) {
        return await this.WaiterService.clearTable(number , input)
    }

    @Mutation()
    async ConfirmCommand(@Args('input') input:WaiterInfoDto , @Args('number') number : number) {
        return await this.WaiterService.confirmCommand(input , number)
    }

    @Mutation() 
    async AddproductTable(@Args('input') input:WaiterInfoDto , @Args('name') name : string , @Args('number') number : number) {
        return await this.WaiterService.addProduct(input , name , number)
    }

    @Mutation()
    async RemoveProductTable(@Args('input') input:WaiterInfoDto , @Args('name') name : string , @Args('number') number : number){
        return await this.WaiterService.RemoveProduct(input , name , number)
    }
    
    @Query()
    async getWaiters() {
        return await this.WaiterService.getWaiters()
    }


    @Query()
    async getWaitersCount() {
        return await this.WaiterService.getWaitersCount()
    }

    @Query()
    async getWaiterByName(@Args('firstname') firstname : string , @Args('lastname') lastname : string ) {
        return await this.WaiterService.getWaiterByName({first : firstname , last : lastname})
    }

    @Query() 
    async getTablesofwaiter(@Args('input') input : WaiterInfoDto){
        const tables = []
        return (await this.TableService.getTablesByWaiter(input)).forEach((table) => {
            tables.push(table.toObject().number)
        })
    }


}
