'use client'

import Image from 'next/image'
import logo from '@/lib/assets/logo.png'
import Link from 'next/link'
import { Home, LogIn, LogOut, ShoppingCart } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/contexts/CartContext'
import { logoutUser } from '@/lib/services/user'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/contexts/UserContext'

export default function Footer() {
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
		<footer className="sm:hidden flex justify-center items-center z-10 bg-background w-full h-16 px-10 xl:px-40
                fixed bottom-0 left-0 border-t-2 border-secondary border-opacity-25">
			<nav className=" flex items-center justify-end gap-20">

				<div className="flex justify-between items-center gap-20">
                    <button onClick={() => router.push("/")}><Home size={32} strokeWidth={3} /></button>
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
		</footer>
	)
}
