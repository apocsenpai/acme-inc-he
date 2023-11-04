'use client'

import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'react-toastify'

import { CartContext } from '@/contexts/CartContext'
import { ICartProduct } from '@/lib/interfaces/Cart'
import { getCart, sendOrder } from '@/lib/services/cart'
import { formatPrice } from '@/lib/helpers/formatters'

import Button from '../Button'
import Item from './Item'
import { getAuthenticated } from '@/lib/services/user'
import { useRouter } from 'next/navigation'

export default function Cart() {
	const { activeCart, setActiveCart } = useContext(CartContext)

	const router = useRouter()

	const [cart, setCart] = useState<ICartProduct[] | null>(null)

	const closeCart = () => setActiveCart(false)

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) =>
		e.key === 'Escape' && closeCart()

	const getTotal = () => {
		if (!cart) return 0

		return cart.reduce(
			(accumulator, { price, quantity }) => accumulator + price * quantity,
			0
		)
	}

	const checkout = async () => {
		const user = getAuthenticated()

		if (!user) {
			toast.error('Usuário deve estar logado para finalizar a compra!')

			router.push('/sign-in')
		}

		if (!cart) toast.info('Adicione algum item no carrinho antes de finalizar!')

		const orderBody = {
			...user,
			items: cart ? [...cart] : [],
			value: getTotal(),
		}

		try {
			await sendOrder(orderBody)

			toast.success('Compra finalizada com sucesso!')
		} catch (error) {
			toast.error('Houve um erro ao finalizar a compra!')
		}
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
					<span>R$ {formatPrice(getTotal())}</span>
				</div>
				<Button onClick={checkout}>Finalizar pedido</Button>
			</div>
		</div>
	) : (
		<></>
	)
}
