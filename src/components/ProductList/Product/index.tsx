import Button from '@/components/Button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'

import { IProduct } from '@/lib/interfaces/Products'
import { FALLBACK_IMAGE, IN_CASH_DISCOUNT } from '@/lib/utils/constants/values'
import { formatPrice } from '@/lib/helpers/formatters'
import { useContext, useState } from 'react'
import Link from 'next/link'
import { CartContext } from '@/contexts/CartContext'
import { addItemToCart } from '@/lib/services/cart'

export default function Product({
	id,
	name,
	description,
	imageUrl,
	price,
	discount,
}: Readonly<IProduct>) {
	const [imageError, setImageError] = useState(false)

	const { setActiveCart } = useContext(CartContext)

	const addToCart = () => {
		setActiveCart(true)
		addItemToCart({ id, name, description, imageUrl, price, discount })
	}

	return (
		<li className="p-3 border flex flex-col justify-between border-secondary bg-background rounded-lg cursor-pointer group shadow-md hover:shadow-xl">
			<Link href={`/products/${id}`}>
				<div>
					<div className="rounded-xl bg-primary w-full h-52 flex justify-center items-center overflow-hidden">
						<Image
							alt="Product"
							width={1500}
							height={900}
							onError={() => setImageError(true)}
							src={imageError ? FALLBACK_IMAGE : imageUrl}
							className="w-full h-full"
						/>
					</div>
					<h2 className="font-bold h-20 flex items-center text-4xl mt-3 mb-1">
						{name}
					</h2>
					<p className="break-all line-clamp-2 text-ellipsis h-12 mb-4">
						{description}
					</p>
				</div>
				<div>
					{discount && (
						<p className="font-thin text-lg h-7 line-through opacity-60">
							R$ {formatPrice(price)}
						</p>
					)}
					<p className="text-alternative font-black text-4xl">
						R${' '}
						{formatPrice(discount ? price - price * IN_CASH_DISCOUNT : price)}
					</p>
					<p className="italic text-lg h-7 font-thin mb-4">
						{discount && <>À vista no boleto ou PIX</>}
					</p>
				</div>
			</Link>
			<Button onClick={addToCart}>
				<ShoppingCart size={32} strokeWidth={3} />
				Comprar
			</Button>
		</li>
	)
}
