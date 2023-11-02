"use client"

import Banner from '@/components/Banner'
import Dropdown from '@/components/Dropdown'
import Filter from '@/components/Dropdown/Filter'
import bannerImage from '@/lib/assets/acme-catalog.png'
import { ListFilter } from 'lucide-react'

export default function Home() {
	return (
		<>
			<Banner imagePath={bannerImage} />
			<div className='px-28 py-16'>
				<header className='flex items-center justify-between'>
					<h1 className='text-7xl font-alt'>Nossos Produtos</h1>
          <div>
            <Dropdown icon={<ListFilter size={36} strokeWidth={3} />} title={'Filtrar'}><Filter/></Dropdown>
          </div>
				</header>
			</div>
		</>
	)
}
