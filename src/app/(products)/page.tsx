'use client'

import Banner from '@/components/Banner'
import Dropdown from '@/components/Dropdown'
import Filter from '@/components/Dropdown/Filter'
import ProductList from '@/components/ProductList'
import bannerImage from '@/lib/assets/acme-catalog.png'
import { ListFilter } from 'lucide-react'

export default function Home() {
	return (
		<>
			<Banner imagePath={bannerImage} />
			<div className="px-10 xl:px-40 py-16">
				<header className="flex items-center justify-between border-b-2 pb-4 border-secondary border-opacity-20">
					<h1 className="text-7xl font-alt">Nossos Produtos</h1>
					<div className='flex gap-20 items-center'>
						<Dropdown
							icon={<ListFilter size={36} strokeWidth={3} />}
							title={'Filtrar'}
						>
							<Filter />
						</Dropdown>
					</div>
				</header>
				<ProductList products={[]}/>
			</div>
		</>
	)
}
