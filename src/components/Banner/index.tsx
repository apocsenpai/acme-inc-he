import Image, { StaticImageData } from 'next/image'

interface BannerProps {
	imagePath: StaticImageData;
}

export default function Banner({ imagePath }: Readonly<BannerProps>) {
	return (
		<div className="flex items-center justify-end mt-20 w-full h-80 bg-blue-200 overflow-hidden">
			<Image src={imagePath} alt='Coyote read Acme catalog' />
		</div>
	)
}
