'use client'
import Image from 'next/image'
import logo from '@/lib/assets/logo.png'
import Link from 'next/link'
import Input from '../Input'
import { LogIn, LogOut, Search, ShoppingCart } from 'lucide-react'
import { useContext, useState } from 'react'
import { CartContext } from '@/contexts/CartContext'
import { getAuthenticated, logoutUser } from '@/lib/services/user'
import { useRouter } from 'next/navigation'

export default function Header() {
	const { setActiveCart } = useContext(CartContext)
	const router = useRouter()

	const [isLogged, setIsLogged] = useState(getAuthenticated())

	const logout = () => {
		logoutUser()
		router.push('/sign-in')
	}

	const redirectToSignIn = () =>{
		router.push('/sign-in')
	}

	return (
		<header className="grid grid-cols-3 items-center z-10 bg-background w-full h-20 px-10 xl:px-40 fixed top-0 left-0 border-b-2 border-secondary border-opacity-25 shadow-header ">
			<Link href={'/'}>
				<Image src={logo} className="w-28" alt="Logo Acme" />
			</Link>
			<Input icon={<Search size={28} strokeWidth={3} />} />
			<nav className="flex items-center justify-end gap-20">
				<Link
					href={'/'}
					className="text-2xl font-bold font-sans text-secondary hover:text-primary"
				>
					Produtos
				</Link>
				<div className="flex gap-10 ">
					<button
						onClick={() => setActiveCart(true)}
						className="hover:text-primary"
					>
						<ShoppingCart size={32} strokeWidth={3} />
					</button>

					{isLogged ? (
						<button onClick={logout} title='Sair' className="hover:text-primary">
							<LogOut size={32} strokeWidth={3} />
						</button>
					) : (
						<button onClick={redirectToSignIn} className="hover:text-primary" title='Logar'>
							<LogIn size={32} strokeWidth={3} />
						</button>
					)}
				</div>
			</nav>
		</header>
	)
}
