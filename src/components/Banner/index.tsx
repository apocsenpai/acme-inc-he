import Image, { StaticImageData } from 'next/image'

interface BannerProps {
	imagePath: StaticImageData;
	product?: boolean;
}

export default function Banner({ imagePath, product = false }: Readonly<BannerProps>) {
	return (
		<div
			className={`hidden md:flex mt-20 w-full h-80  overflow-hidden ${
				product ? 'items-start justify-start bg-alternative' : 'items-center justify-end bg-blue-200'
			}`}
		>
			<Image src={imagePath} alt="Our most loyal customer" className={`${product && 'relative w-[68rem] -left-28'}`} />
		</div>
	)
}
