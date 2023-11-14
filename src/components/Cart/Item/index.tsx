import { formatPrice } from '@/lib/helpers/formatters'
import { ICartProduct } from '@/lib/interfaces/Cart'
import { FALLBACK_IMAGE, IN_CASH_DISCOUNT } from '@/lib/utils/constants/values'
import Image from 'next/image'
import { useState } from 'react'

export default function Item({
	id,
	name,
	imageUrl,
	price,
	quantity,
	discount,
}: Readonly<ICartProduct>) {
	const [imageError, setImageError] = useState(false)

	return (
		<div className="border border-alternative py-2 px-3  rounded-lg flex gap-4 mb-2">
			<div className="overflow-hidden h-28 w-28 rounded-xl">
				<Image
					alt={`Product ${name}`}
					width={1500}
					height={900}
					onError={() => setImageError(true)}
					src={imageError ? FALLBACK_IMAGE : imageUrl}
					className="w-full h-full"
				/>
			</div>
			<div className="flex flex-col justify-between flex-grow">
				<p className="text-alternative font-bold text-2xl">{name}</p>
				<div className="w-full text-alternative font-bold text-lg flex justify-between flex-col sm:flex-row">
					<span>Quantidade: {quantity}</span>
					<span>
						Price:{' '}
						{formatPrice(discount ? price - price * IN_CASH_DISCOUNT : price)}
					</span>
				</div>
			</div>
		</div>
	)
}
