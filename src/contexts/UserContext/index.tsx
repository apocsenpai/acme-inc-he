'use client'

import { getAuthenticated } from '@/lib/services/user'
import React, { useMemo, useState } from 'react'
import { IUser } from '@/lib/interfaces/User'

interface IUserContext {
	user:  IUser | null;
	setUser: React.Dispatch<React.SetStateAction< IUser | null>>;
}

export const UserContext = React.createContext<IUserContext>({
	user: getAuthenticated(),
	setUser: () => false,
})

export const UserProvider = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const [user, setUser] = useState(getAuthenticated())

	const contextValue = useMemo(() => ({ user, setUser }), [user, setUser])

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	)
}
