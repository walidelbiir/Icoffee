import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesResolver } from './tables.resolver';
import { TableSchema } from './tables.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TablesController } from './tables.controller';

@Module({
  imports: [MongooseModule.forFeature([{name : "Table" , schema : TableSchema }])],
  providers: [TablesService, TablesResolver],
  exports : [TablesService , TablesResolver ],
  controllers: [TablesController]
}) 
export class TablesModule {}
  