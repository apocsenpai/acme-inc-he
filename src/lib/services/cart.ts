import { ICartProduct, IOrder } from '../interfaces/Cart'
import { IProduct } from '../interfaces/Products'
import repository from '../repository/repository'

export function getCart() {
	return repository.find<ICartProduct[]>('cart')
}

export function addItemToCart(item: IProduct) {
	const data = repository.find<ICartProduct[]>('cart')

	repository.create('cart', addQuantityIfExists(data, item))
}

export function removeCart() {
	repository.remove('cart')
}

export async function sendOrder(order: IOrder) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			//JSON gerado

			resolve(repository.create('order', order))
		}, 800)
	})
}

function addQuantityIfExists(
	oldCart: ICartProduct[],
	item: IProduct
): ICartProduct[] {
	const cart = oldCart

	if (!cart) return [{ ...item, quantity: 1 }]

	const indexAddedAlready = cart.findIndex(
		(cartItem) => cartItem.id === item.id
	)

	if (indexAddedAlready >= 0) {
		cart[indexAddedAlready] = {
			...cart[indexAddedAlready],
			quantity: cart[indexAddedAlready].quantity + 1,
		}
		return cart
	}

	return [...cart, { ...item, quantity: 1 }]
}
