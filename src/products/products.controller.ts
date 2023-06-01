import { Controller, Get } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';

@Controller('products')
export class ProductsController extends ProductsResolver {

    @Get('all')
    async getproducts() {
        return await this.getProducts();
    }

    
}
