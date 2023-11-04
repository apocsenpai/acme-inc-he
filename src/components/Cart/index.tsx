'use client'

import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'

import { CartContext } from '@/contexts/CartContext'
import { ICartProduct } from '@/lib/interfaces/Cart'
import { getCart } from '@/lib/services/cart'
import { formatPrice } from '@/lib/helpers/formatters'

import Button from '../Button'
import Item from './Item'

export default function Cart() {
	const { activeCart, setActiveCart } = useContext(CartContext)

	const [cart, setCart] = useState<ICartProduct[] | null>(null)

	const closeCart = () => setActiveCart(false)

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) =>
		e.key === 'Escape' && closeCart()

	const getTotal = () => {
		if (!cart) return '0,00'

		return formatPrice(
			cart.reduce(
				(accumulator, { price, quantity }) => accumulator + price * quantity,
				0
			)
		)
	}

	useEffect(() => {
		async function fetchCart() {
			function fetchProductList() {
				const data = getCart()

				setCart(data)
			}

			fetchProductList()
		}

		fetchCart()
	}, [activeCart])

	return activeCart ? (
		<div className="overflow-hidden w-full bg-secondary bg-opacity-30 min-h-screen top-0 left-0 z-20 fixed grid grid-cols-[1fr,_40rem]">
			<div onClick={closeCart} onKeyDown={handleKeyDown} className=""></div>
			<div
				className={`relative py-8 px-6 top-0 transition-all bg-secondary animate-slideCart flex flex-col justify-between gap-8`}
			>
				<h1 className="text-alternative font-extrabold text-4xl flex items-center gap-3">
					<ShoppingCart strokeWidth={3} size={40} />
					Carrinho
				</h1>
				<ul className="flex-grow h-96 overflow-y-auto px-2">
					{cart ? (
						cart.map((item) => <Item key={item.id} {...item} />)
					) : (
						<div className="w-full h-full flex justify-center text-2xl items-center text-zinc-500">
							Carrinho vazio {':('}
						</div>
					)}
				</ul>
				<div className="text-alternative font-extrabold text-4xl flex justify-between">
					<span>Total</span>
					<span>R$ {getTotal()}</span>
				</div>
				<Button>Finalizar pedido</Button>
			</div>
		</div>
	) : (
		<></>
	)
}
