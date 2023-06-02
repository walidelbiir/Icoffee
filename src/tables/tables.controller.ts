import { Controller, Get } from '@nestjs/common';
import { TablesResolver } from './tables.resolver';

@Controller('tables')
export class TablesController extends TablesResolver {

    @Get('all')
    getallTables(){
        this.getTables();
    }


    

}
