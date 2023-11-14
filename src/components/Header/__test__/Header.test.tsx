import { render, screen } from '@testing-library/react'
import { usePathname, useRouter } from 'next/navigation'
import userEvent from '@testing-library/user-event'
import { UserContext } from '@/contexts/UserContext'

import Header from '@/components/Header'
import { IUser } from '@/lib/interfaces/User'

const mockUser = {
	name: 'Foo',
	email: 'foo@foo.com.br',
	password: 'Example@123',
	phone: '21029109',
	favorites: {
		1: true,
	},
}

jest.mock('next/navigation')

const renderComponent = (user: IUser | null = null) => {
	const setUser = jest.fn()

	render(
		<UserContext.Provider value={{ user, setUser }}>
			<Header />
		</UserContext.Provider>
	)
}

describe('Header', () => {
	describe('Render', () => {
		it('should render the logo link', () => {
			renderComponent()

			const logo = screen.getByTestId('logo')

			expect(logo).toBeInTheDocument()
		})

		it('should render the products button', () => {
			renderComponent()

			const products = screen.getByTestId('products-button')

			expect(products).toBeInTheDocument()
		})

		it('should render the logout button', () => {
			renderComponent()

			const loginButton = screen.getByTestId('login-button')

			expect(loginButton).toBeInTheDocument()
		})

		it('should render the logout button', () => {
			renderComponent(mockUser)

			const logoutButton = screen.getByTestId('logout-button')

			expect(logoutButton).toBeInTheDocument()
		})
	})
})
