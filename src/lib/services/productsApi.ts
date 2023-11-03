import productListGenerator from '../helpers/productListGenerator'
import { IProduct } from '../interfaces/Products'
import repository from '../repository/repository'

export async function getProducts(): Promise<IProduct[]> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const data = repository.find<IProduct[]>('productList')

			if (!data) resolve(productListGenerator(20))

			if (data) resolve(data)

			reject(new Error('NotFound'))
		}, 1500)
	})
}
