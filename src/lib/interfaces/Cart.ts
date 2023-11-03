import { IProduct } from "./Products";

export interface ICartProduct extends IProduct {
	quantity: number;
}
