"use client"

import Image from 'next/image'

import imageUrl from '@/lib/assets/not-found.png'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter();

    setTimeout(()=> router.push('/'), 1000)

	return (
		<main className="flex flex-col items-center justify-center w-full min-h-screen">
			<div className="lg:w-[80rem]">
				<h1 className="font-extrabold text-5xl mb-6">Página não encontrada</h1>
				<div className="relative flex justify-end">
					<div className='absolute text-9xl font-extrabold left-0 top-40'>
                        Erro 404
                    </div>
                    <div className='absolute text-5xl font-extrabold left-0 top-80 w-[40rem]'>Você será redirecionado automaticamente.</div>
					<Image src={imageUrl} alt="Pagina não encontrada." className='w-[calc(100%_-_16rem)]'/>
				</div>
			</div>
		</main>
	)
}
