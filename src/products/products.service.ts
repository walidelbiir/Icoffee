import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { CreateDTO } from "./dtos/CreateDTO";
import { ModifyProductDTO } from './dtos/modify-product.dto';
import { ProductInterface } from './Interfaces/product.interface';

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly ProductModel : Model<ProductInterface>){}

    async getProducts() {
        return await this.ProductModel.find().exec();
    }
    
    async getProductsByType(type : String){
        return await this.ProductModel.find({type: type}).exec();
    }

    async getIdByName(name : String) {
        return (await this.ProductModel.findOne({name : name}).exec())._id;
    }

    async getProductByName(nom : String){
       return await this.ProductModel.findOne({name : nom}).select({name : 1 , type : 1 , price : 1}).exec()
        
    }

    async createProduct(product : CreateDTO){
        const createdProduct = await new this.ProductModel(product);
        return await createdProduct.save();
    }

    async modifyProduct(nom : String ,product : ModifyProductDTO){
        const Product = await this.ProductModel.findOne({name : nom}).exec()
        const {name , type ,price} = product;
        if(name) {
            Product.name = name;
        }
        if(type) {
            Product.type = type;
        }
        if(price) {
            Product.price = price;
        }
        return await Product.save();
    }

    async removeProducts( name ?: String , type?: String) {
       if(name && type) {
        await this.ProductModel.deleteOne({name: name, type: type}).exec();
        return 'Success';
       }
       else if(type) {
        await this.ProductModel.deleteMany({type : type}).exec();
        return 'Success';
       }
       else if (name) {
        await this.ProductModel.deleteOne({name: name}).exec(); 
        return 'Success';
       }
       else {
        return 'error must provide a name or a type parameter'
       }
    }

}
