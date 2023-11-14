'use client'

import Image from 'next/image'
import logo from '@/lib/assets/logo.png'
import Link from 'next/link'
import { LogIn, LogOut, ShoppingCart } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/contexts/CartContext'
import { logoutUser } from '@/lib/services/user'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/contexts/UserContext'

export default function Header() {
	const { setActiveCart } = useContext(CartContext)
	const { user } = useContext(UserContext)

	const [isLogged, setIsLogged] = useState(false)

	const router = useRouter()

	const logout = () => {
		logoutUser()
		router.push('/sign-in')
	}

	const redirectToSignIn = () => {
		router.push('/sign-in')
	}
	useEffect(() => {
		if (user) setIsLogged(true)
	}, [user])
	return (
		<header className="grid grid-cols-2 items-center z-10 bg-background w-full h-20 px-10 xl:px-40 fixed top-0 left-0 border-b-2 border-secondary border-opacity-25 shadow-header ">
			<Link href={'/'} data-testid="logo">
				<Image src={logo} className="w-28" alt="Logo Acme" />
			</Link>
			<nav className="flex items-center justify-end gap-20">
				<Link
					href={'/'}
					className="text-2xl font-bold font-sans text-secondary hover:text-primary"
					data-testid="products-button"
				>
					Produtos
				</Link>
				<div className="flex gap-10 ">
					<button
						onClick={() => setActiveCart(true)}
						className="hover:text-primary"
						data-testid="cart-button"
					>
						<ShoppingCart size={32} strokeWidth={3} />
					</button>

					{isLogged ? (
						<button
							onClick={logout}
							title="Sair"
							className="hover:text-primary"
							data-testid="logout-button"
						>
							<LogOut size={32} strokeWidth={3} />
						</button>
					) : (
						<button
							onClick={redirectToSignIn}
							className="hover:text-primary"
							title="Logar"
							data-testid="login-button"
						>
							<LogIn size={32} strokeWidth={3} />
						</button>
					)}
				</div>
			</nav>
		</header>
	)
}
