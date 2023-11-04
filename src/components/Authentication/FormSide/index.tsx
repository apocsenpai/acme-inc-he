import Image from 'next/image'
import logo from '@/lib/assets/logo-authenticated.png'

export default function FormSide({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<aside className="flex flex-col items-center p-6 sm:p-20 md:p-40 lg:p-8 xl:p-16">
			<Image
				src={logo}
				alt="Logo acme inc"
				className="w-40 mb-10"
			/>
			{children}
		</aside>
	)
}
