import { useEffect, useState } from 'react'
import Product from './Product'

import { IProduct } from '@/lib/interfaces/Products'
import { getProducts } from '@/lib/services/productsApi'

interface ProductListProps {
	products?: string[];
}

export default function ProductList(props: Readonly<ProductListProps>) {
	const [products, setProducts] = useState<IProduct[] | null>(null)

	useEffect(() => {
		async function fetchProductList() {
			try {
				const data = await getProducts()

				setProducts(data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchProductList()
	}, [])

	return !products ? (
		<div>Loading...</div>
	) : (
		<ul className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-[repeat(5,_minmax(18rem,_1fr))] auto-rows-fr gap-x-8 gap-y-6">
			{products.map((p) => (
				<Product key={p.id} {...p} />
			))}
		</ul>
	)
}
