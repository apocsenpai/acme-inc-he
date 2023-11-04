import Image from 'next/image'
import logo from '@/lib/assets/logo-authenticated.png'

export default function BrandSide() {
	return (
		<aside className="bg-primary px-10 py-8 pr lg:flex flex-col gap-6 justify-end items- hidden">
			<div className="text-4xl w-full flex justify-between items-center font-bold">
				<Image src={logo} alt="Acme Inc" /> <p className='text-secondary'>Inovações sempre à frente.</p>
			</div>
		</aside>
	)
}
