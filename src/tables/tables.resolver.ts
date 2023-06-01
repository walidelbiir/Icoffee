import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModifyTableInput } from 'src/grahql';
import { TableInterface } from './Interfaces/table.interface';
import { TablesService } from './tables.service';

@Resolver()
export class TablesResolver {
    constructor(private readonly TableService : TablesService){}

    @Query()
    getTables()  {
        return this.TableService.getTables()
    }

    @Query()
    getLatestNumber() {
        return this.TableService.getLatestNumber()
    }

    @Query() 
    getTableByNumber(@Args('number')number : number) {
        return this.TableService.getTableByNumber(number);
    }

    @Query()
    getWaiter(@Args('number')number : number) {
        return  this.TableService.getWaiter(number);
    }

    @Mutation()
    Addtable() {
       return this.TableService.addTable();
    } 
    
    @Mutation()
    RemoveTable(@Args('number')number : number) {
       return  this.TableService.RemoveTable(number);
    }

    @Mutation()
    UpdateTable(@Args('number')number : number , @Args('input') input : ModifyTableInput  ) {
        return this.TableService.UpdateTable(number , input)
    } 

} 
   