'use client'

import Banner from '@/components/Banner'
import Dropdown from '@/components/Dropdown'
import Filter from '@/components/Dropdown/Filter'
import ProductList from '@/components/ProductList'
import bannerImage from '@/lib/assets/acme-catalog.png'
import { ListFilter } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
	const [favoriteFilter, setFavoriteFilter] = useState(false)
	const [nameFilter, setNameFilter] = useState('')

	const toggleFavoriteFilter = () => setFavoriteFilter(!favoriteFilter);

	return (
		<>
			<Banner imagePath={bannerImage} />
			<div className="px-10 xl:px-40 py-16  mt-10 md:mt-0">
				<header className="flex justify-between md:justify-start items-center gap-4 md:gap-10 border-b-2 pb-4 border-secondary border-opacity-20">
					<h1 className="text-4xl md:text-7xl font-alt">Nossos Produtos</h1>
					<div className='hidden md:block self-stretch w-[1px] bg-secondary bg-opacity-20'/>
					<div className="flex items-center">
						<Dropdown
							icon={<ListFilter size={36} strokeWidth={3} />}
							title={'Filtrar'}
						>
							<Filter toggleFavoriteFilter={toggleFavoriteFilter} setNameFilter={setNameFilter}/>
						</Dropdown>
					</div>
				</header>
				<ProductList favoriteFilter={favoriteFilter} nameFilter={nameFilter}/>
			</div>
		</>
	)
}
