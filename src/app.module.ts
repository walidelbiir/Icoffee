import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ProductsModule } from './products/products.module';
import { WaiterModule } from './waiter/waiter.module';
import { TablesModule } from './tables/tables.module';




@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths : ['./**/*.graphql'],
      definitions : {
        path : join(process.cwd() , 'src/grahql.ts'),
        outputAs : 'class',
      },
    }),
    MongooseModule.forRoot("mongodb+srv://walidelbir:walidelbir@cluster0.jbaryqm.mongodb.net/ProjetWeb"),
    ProductsModule,
    WaiterModule,
    TablesModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
