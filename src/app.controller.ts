import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsResolver } from './products/products.resolver';
import { TablesResolver } from './tables/tables.resolver';
import { WaiterResolver } from './waiter/waiter.resolver';

@Controller()
export class AppController {
  constructor(){}


}
