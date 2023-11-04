'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { ShoppingCart } from 'lucide-react'

import { CartContext } from '@/contexts/CartContext'
import { IProduct } from '@/lib/interfaces/Products'
import { getProductById } from '@/lib/services/products'
import { addItemToCart } from '@/lib/services/cart'

import bannerImage from '@/lib/assets/product-background.svg'
import { FALLBACK_IMAGE, IN_CASH_DISCOUNT } from '@/lib/utils/constants/values'
import { formatPrice } from '@/lib/helpers/formatters'
import Button from '@/components/Button'
import Banner from '@/components/Banner'

interface IProductPage {
	params: { productId: string };
}

export default function ProductPage({
	params,
	...props
}: Readonly<IProductPage>) {
	const [product, setProduct] = useState<IProduct | null>(null)

	const [imageError, setImageError] = useState(false)

	const router = useRouter()

	const { setActiveCart } = useContext(CartContext)

	const addToCart = () => {
		if (!product) return

		toast.success(`${product.name} foi adicionado ao carrinho com sucesso!`)
		setActiveCart(true)
		addItemToCart(product)
	}

	useEffect(() => {
		async function fetchProduct() {
			try {
				const productId = Number(params.productId)

				if (!productId) throw new Error('Produto não encontrado!')

				const data = await getProductById(productId)

				setProduct(data)
			} catch (error) {
				console.log(error)
				router.push('/')
			}
		}

		fetchProduct()
	}, [params.productId, router])

	return (
		<>
			<Banner imagePath={bannerImage} product={true} />
			{product ? (
				<main className="flex flex-col items-center px-10 xl:px-40 py-16">
					<div className="2xl:w-5/6">
						<h1 className="text-7xl font-alt self-start mb-4">
							{product.name}
						</h1>
						<div className="grid grid-cols-2 gap-6">
							<div className="rounded-xl bg-primary w-full flex justify-center items-center overflow-hidden">
								<Image
									alt={`Product ${product.name}`}
									width={1500}
									height={900}
									onError={() => setImageError(true)}
									src={imageError ? FALLBACK_IMAGE : product.imageUrl}
									className="w-full h-full"
								/>
							</div>
							<div className="flex flex-col justify-between">
								<div>
									<h2 className="font-bold h-20 flex items-center text-4xl mt-3 mb-1">
										{product.name}
									</h2>
									<p className="break-all text-xl mb-4">
										{product.description}
									</p>
								</div>
								<div>
									{product.discount && (
										<p className="font-thin text-xl h-7 line-through opacity-60">
											R$ {formatPrice(product.price)}
										</p>
									)}
									<p className="text-alternative font-black text-5xl">
										R${' '}
										{formatPrice(
											product.discount
												? product.price - product.price * IN_CASH_DISCOUNT
												: product.price
										)}
									</p>
									<p className="italic text-xl h-7 font-thin mt-2">
										{product.discount && <>À vista no boleto ou PIX</>}
									</p>
								</div>
								<Button onClick={addToCart}>
									<ShoppingCart size={32} strokeWidth={3} />
									Comprar
								</Button>
							</div>
						</div>
					</div>
				</main>
			) : (
				<div>Loading...</div>
			)}
		</>
	)
}
