'use client'

import BrandSide from '@/components/Authentication/BrandSide'
import FormSide from '@/components/Authentication/FormSide'
import { CartContext } from '@/contexts/CartContext'
import { ShoppingCart } from 'lucide-react'
import { useContext } from 'react'

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { setActiveCart } = useContext(CartContext)

	return (
		<main className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[2fr_1fr] ">
			<BrandSide />
			<FormSide> {children}</FormSide>
			<button
				onClick={() => setActiveCart(true)}
				className="absolute w-16 h-16 bg-alternative flex items-center justify-center rounded-full bottom-5 right-5 hover:opacity-85"
			>
				<ShoppingCart size={28} strokeWidth={3} />
			</button>
		</main>
	)
}
