import { IProduct } from "./Products";

export interface ICartProduct extends IProduct {
	quantity: number;
}


export interface IOrder {
	email: string;
	phone: string;
	items: ICartProduct[];
	value: number
}