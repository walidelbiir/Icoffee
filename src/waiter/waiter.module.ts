import { Module } from '@nestjs/common';
import { WaiterService } from './waiter.service';
import { WaiterResolver } from './waiter.resolver';
import { WaiterSchema } from './waiter.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TablesService } from 'src/tables/tables.service';
import { TablesModule } from 'src/tables/tables.module';
import { ProductsModule } from 'src/products/products.module';
import { TablesResolver } from 'src/tables/tables.resolver';
import { WaiterController } from './waiter.controller';

@Module({
  imports: [MongooseModule.forFeature([{name : "Waiter" , schema : WaiterSchema }]) , TablesModule , ProductsModule],
  providers: [WaiterService, WaiterResolver],
  controllers: [WaiterController]
})
export class WaiterModule {}
 