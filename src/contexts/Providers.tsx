'use client'

import { ReactNode } from 'react'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
import { CartProvider } from './CartContext'
import { UserProvider } from './UserContext'

export default function Providers({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<UserProvider>
			<CartProvider>
				{children}
				<ToastContainer
					position="top-right"
					autoClose={1500}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</CartProvider>
		</UserProvider>
	)
}
