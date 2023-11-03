import type { Metadata } from 'next'
import { Barlow, Khand } from 'next/font/google'
import './globals.css'

import Cart from '@/components/Cart'
import Providers from '@/contexts/Providers'

const barlow = Barlow({
	subsets: ['latin'],
	weight: ['900', '700', '400', '100'],
	variable: '--font-barlow',
})
const khand = Khand({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-khand',
})

export const metadata: Metadata = {
	title: 'Acme Inc. | A melhor solução ao seu alcance',
	description: 'Acme Inc. - Inovação a qualquer custo',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode,
}>) {
	return (
		<html lang="en">
			<body
				className={`${barlow.variable} ${khand.variable} font-sans text-secondary`}
			>
				<Providers>
					{children}
					<Cart />
				</Providers>
			</body>
		</html>
	)
}
