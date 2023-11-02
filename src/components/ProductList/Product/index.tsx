import Button from '@/components/Button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'

export default function Product() {
	return (
		<li className="p-4 border border-secondary bg-background rounded-lg">
			<Image
				alt="The guitarist in the concert."
				src={`https://picsum.photos/id/1/500/400`}
				width={2250}
				height={1390}
				layout="responsive"
				className="rounded-xl"
			/>
			<h2 className="font-bold text-4xl mt-3">Name</h2>
			<p className="truncate mb-4">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
				porro sapiente velit nulla consectetur expedita quis fugiat cupiditate
				provident nihil ab illum, cum, rerum quasi modi! Saepe nulla quia
				obcaecati praesentium nobis dignissimos fuga. Vitae provident quia
				expedita ducimus asperiores.
			</p>
            <p className='font-thin text-lg line-through opacity-60'>R$ 300,00</p>
            <p className='text-alternative font-black text-4xl'>R$ 280,00</p>
            <p className='italic text-lg font-thin mb-4'>À vista no boleto ou PIX</p>
            <Button><ShoppingCart size={32} strokeWidth={3} />Comprar</Button>
		</li>
	)
}
