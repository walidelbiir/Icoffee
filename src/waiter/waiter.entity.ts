import { Float, ObjectType , Field } from "@nestjs/graphql";
import { TableEntity } from "src/tables/table.entity";
import { TablesService } from "src/tables/tables.service";
import { WaiterInterface } from "./Interfaces/waiter.Interface";

@ObjectType()
export class WaiterEntity implements WaiterInterface {


    constructor(infos : {firstname : string , lastname : string , num ?: number} ){
        this.setfirstname(infos.firstname);
        this.setlastname(infos.lastname);
        if(infos.num) this.setnumero_tel(infos.num);
    }
    
@Field()
   first : string;
   @Field()
   last : string;
   @Field()
   joined_at : string;
   @Field()
   numero_tel : number;
   @Field(() => Float)
   money : number;

    setfirstname( name : string)  {
        this.first = name
    }

    setlastname( name : string) {
        this.last = name;
    }

    setnumero_tel(num : number) {
        this.numero_tel = num;
    }

    setjoinedat(joined : string) {
        this.joined_at = joined;
    }
    
    setmoney(money : number){
        this.money = money;
    }
}
 