import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TablesService } from 'src/tables/tables.service';
import { WaiterInfoDto } from './Dtos/add-waiter.dto';
import { WaiterService } from './waiter.service';

@Resolver()
export class WaiterResolver {

    constructor(private readonly WaiterService : WaiterService,
        private readonly TableService : TablesService){}
        
    @Mutation()
    async AddWaiter(@Args('input') info : WaiterInfoDto) {
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
    async AddProductTable(@Args('input') input:WaiterInfoDto , @Args('name') name : string , @Args('number') number : number) {
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
    
    
    @Mutation()
    async AssignWaiter(@Args('input') input : WaiterInfoDto , @Args('number') number : number) {
        await this.WaiterService.assignTable(input , number)
        return true
    }


}
