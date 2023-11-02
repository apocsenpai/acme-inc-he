import Product from './Product'

interface ProductListProps {
	products: string[];
}

export default function ProductList({ products }: Readonly<ProductListProps>) {
	return (
		<ul className="mt-8 grid lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-[repeat(5,_minmax(18rem,_1fr))] gap-x-8 gap-y-6">
			<Product />
			<Product />
			<Product />
			<Product />
            <Product />
            <Product />
            <Product />
		</ul>
	)
}
