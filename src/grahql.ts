
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Status {
    occupiedPaid = "occupiedPaid",
    occupiedNotPaid = "occupiedNotPaid",
    free = "free"
}

export class AddProductInput {
    name: string;
    type: string;
    price: number;
}

export class ModifyProductInput {
    name?: Nullable<string>;
    type?: Nullable<string>;
    price?: Nullable<number>;
}

export class RemoveProductInput {
    name?: Nullable<string>;
    type?: Nullable<string>;
}

export class ModifyTableInput {
    number?: Nullable<number>;
    status?: Nullable<Status>;
    orderedProducts?: Nullable<Nullable<AddProductInput>[]>;
    waiter?: Nullable<WaiterInput>;
}

export class OrderProductInput {
    name: string;
    type?: Nullable<string>;
}

export class WaiterInput {
    first: string;
    last: string;
    numero_tel?: Nullable<number>;
}

export class Product {
    _id: string;
    name: string;
    type: string;
    price: number;
}

export abstract class IQuery {
    abstract getProducts(): Nullable<Product>[] | Promise<Nullable<Product>[]>;

    abstract getProductsByType(type: string): Nullable<Product>[] | Promise<Nullable<Product>[]>;

    abstract getTables(): Nullable<Table>[] | Promise<Nullable<Table>[]>;

    abstract getLatestNumber(): number | Promise<number>;

    abstract getTableByNumber(number?: Nullable<number>): Table | Promise<Table>;

    abstract getWaiter(number?: Nullable<number>): Nullable<Waiter> | Promise<Nullable<Waiter>>;

    abstract getWaiters(): Nullable<Waiter>[] | Promise<Nullable<Waiter>[]>;

    abstract getWaitersCount(): number | Promise<number>;

    abstract getWaiterByName(firstname: string, lastname?: Nullable<string>): Waiter | Promise<Waiter>;
}

export class MutationResult {
    success: boolean;
}

export abstract class IMutation {
    abstract addProduct(input: AddProductInput): Product | Promise<Product>;

    abstract modifyProduct(nom: string, input: ModifyProductInput): Product | Promise<Product>;

    abstract removeProduct(input: RemoveProductInput): MutationResult | Promise<MutationResult>;

    abstract Addtable(): Table | Promise<Table>;

    abstract RemoveTable(number?: Nullable<number>): boolean | Promise<boolean>;

    abstract UpdateTable(number?: Nullable<number>, input?: Nullable<ModifyTableInput>): Table | Promise<Table>;

    abstract AddWaiter(input: WaiterInput): Waiter | Promise<Waiter>;

    abstract RemoveWaiter(input: WaiterInput): Waiter | Promise<Waiter>;
}

export class Table {
    number: number;
    status: Status;
    orderedProducts: Nullable<Product>[];
    waiter?: Nullable<Waiter>;
}

export class Waiter {
    _id: string;
    firstname: string;
    lastname: string;
    joined_at: string;
    tables: Nullable<Table>[];
    numero_tel: number;
}

type Nullable<T> = T | null;
