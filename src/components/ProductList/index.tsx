'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import Product from './Product'

import { IProduct } from '@/lib/interfaces/Products'
import { getProducts } from '@/lib/services/products'
import { UserContext } from '@/contexts/UserContext'

interface ProductListProps {
	products?: string[];
	favoriteFilter: boolean;
	nameFilter: string;
}

export default function ProductList(props: Readonly<ProductListProps>) {
	const [products, setProducts] = useState<IProduct[] | null>(null)

	const { user } = useContext(UserContext)

	const setAccordlyingFilter = useCallback(
		(data: IProduct[]) => {
			if (user?.favorites && props.favoriteFilter && props.nameFilter)
				return data
					.filter(({ id }) => user.favorites[id])
					.filter(({ name }) => name.toLocaleLowerCase().includes(props.nameFilter.toLocaleLowerCase()))

			if (user?.favorites && props.favoriteFilter)
				return data.filter(({ id }) => user.favorites[id])

			if (props.nameFilter)
				return data.filter(({ name }) =>
					name.toLocaleLowerCase().includes(props.nameFilter.toLocaleLowerCase())
				)
			return data
		},
		[props.favoriteFilter, props.nameFilter, user?.favorites]
	)

	useEffect(() => {
		async function fetchProductList() {
			try {
				const data = await getProducts()

				setProducts(setAccordlyingFilter(data))
			} catch (error) {
				console.log(error)
			}
		}

		fetchProductList()
	}, [props.favoriteFilter, props.nameFilter, user, setAccordlyingFilter])

	return !products ? (
		<div>Loading...</div>
	) : (
		<ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-[repeat(5,_minmax(18rem,_1fr))] auto-rows-fr gap-x-8 gap-y-6">
			{products.map((p) => (
				<Product key={p.id} {...p} />
			))}
		</ul>
	)
}
