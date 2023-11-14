import { render, screen } from '@testing-library/react'
import Home from '@/app/(products)/page'
import '@testing-library/jest-dom'


describe('Home', () => {
	it('should rend a heading', () => {
		render(<Home />)

		const heading = screen.getByRole('heading', {
			name: "Nossos Produtos",
		})

		expect(heading).toBeInTheDocument()
	})
})
