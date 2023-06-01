import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsResolver } from './products.resolver';
import { productsSchema } from './products.schema';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [MongooseModule.forFeature([{name : "Product" , schema : productsSchema }])],
  providers: [ProductsService , ProductsResolver],
  exports : [ProductsService , ProductsResolver],
  controllers: [ProductsController]
})
export class ProductsModule {} 
  