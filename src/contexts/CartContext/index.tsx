import React, { useMemo, useState } from 'react'

interface ICartContext {
	activeCart: boolean;
	setActiveCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartContext = React.createContext<ICartContext>({
	activeCart: false,
	setActiveCart: () => false,
})

export const CartProvider = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const [activeCart, setActiveCart] = useState(false)

	const contextValue = useMemo(
		() => ({ activeCart, setActiveCart }),
		[activeCart, setActiveCart]
	)

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	)
}
