'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import { signInUser } from '@/lib/services/user'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

interface ISignInForm {
	email: string;
	password: string;
}

export default function SignIn() {
	const router = useRouter()

	const [formData, setFormData] = useState<ISignInForm>({
		email: '',
		password: '',
	})

	const [formErrors, setFormErrors] = useState<string>('')

	const handleOnChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = {
			[e.target.name]: e.target.value,
		}
		setFormErrors('')
		setFormData({ ...formData, ...inputValue })
	}

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await signInUser({
				email: formData.email,
				password: formData.password,
			})

			router.push('/')
		} catch (error) {
			// @ts-ignore
			const errorMessage: string = error.message
			setFormErrors('Login ou senha inválidos.')
			toast.error(errorMessage)
		}
	}

	return (
		<>
			<h1 className="text-secondary font-bold text-4xl self-start">
				Entrar
			</h1>

			<form
				onSubmit={handleFormSubmit}
				className="w-full mt-12 flex flex-col justify-center"
			>
				<Input
					type="text"
					onChange={handleOnChangeEvent}
					value={formData.email}
					error={formErrors}
					name="email"
					placeholder="Digite seu email"
					label="Email"
				/>

				<Input
					type="password"
					onChange={handleOnChangeEvent}
					value={formData.password}
					error={formErrors}
					name="password"
					placeholder="Digite sua senha"
					label="Senha"
				/>

				<Button className="mt-6">Entrar</Button>
			</form>
			<Link
				href={'/sign-up'}
				className="font-bold text-xl hover:text-alternative mt-6"
			>
				Não tem uma conta? <span className="underline">Registre-se</span>
			</Link>
		</>
	)
}
