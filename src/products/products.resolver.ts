import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AddProductInput, ModifyProductInput, MutationResult, Product, RemoveProductInput } from "src/grahql";
import { ProductsService } from "./products.service";


@Resolver()
export class ProductsResolver {

    constructor( private readonly ProductsService: ProductsService){}

    @Query( () => [Product]) 
    async getProducts() {
        return await this.ProductsService.getProducts();
    }

    @Query(() => [Product])
    async getProductsByType(@Args('type') type: string) {
        return await this.ProductsService.getProductsByType(type);
    }

    @Mutation()
    async addProduct(@Args('input')input : AddProductInput) {
        const product = await this.ProductsService.createProduct(input);
        product.id = product._id;
        return product;
    }

    @Mutation()
    async modifyProduct(@Args('nom') nom : String ,@Args('input')input : ModifyProductInput) {
        return await this.ProductsService.modifyProduct(nom,input);
    }

    @Mutation() 
    async removeProduct(@Args('input') input : RemoveProductInput) : Promise<MutationResult> {
        const {name , type} = input;
        const result = await this.ProductsService.removeProducts(name , type)
        const returnvalue = new MutationResult();
        (result === "Success") ? returnvalue.success = true : returnvalue.success = false;
        return returnvalue;
    } 
   
}