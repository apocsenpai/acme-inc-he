'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Input from '@/components/Input'
import { normalize } from '@/lib/helpers/formatters'
import { handleFormErrors } from '@/lib/helpers/handleFormError'
import { IUser } from '@/lib/interfaces/User'
import { createUser } from '@/lib/services/user'

interface ISignUpForm extends IUser {
	confirmedPassword: string;
}

export default function SignUp() {
	const router = useRouter()

	const [formData, setFormData] = useState<ISignUpForm>({
		email: '',
		password: '',
		confirmedPassword: '',
		name: '',
		phone: '',
	})

	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>()

	const handleOnChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
		const mask = normalize[e.target.name]

		const inputValue = {
			[e.target.name]: mask ? mask(e.target.value) : e.target.value,
		}

		setFormErrors({ ...formErrors, [e.target.name]: '' })

		setFormData({ ...formData, ...inputValue })
	}

	const handleFormData = () => {
		const errors = handleFormErrors({ ...formData })

		if (errors) {
			setFormErrors(errors)
			throw new Error('Houve um erro ao preencher o cadastro!')
		}
	}

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			handleFormData()

			await createUser({
				email: formData.email,
				password: formData.password,
				name: formData.name,
				phone: formData.phone,
			})

			router.push('/')
		} catch (error) {
			// @ts-ignore
			const errorMessage: string = error.message

			toast.error(errorMessage)
		}
	}

	return (
		<>
			<h1 className="text-secondary font-bold text-4xl self-start">
				Registre-se
			</h1>

			<form
				onSubmit={handleFormSubmit}
				className="w-full mt-12 flex flex-col justify-center"
			>
				<Input
					type="text"
					onChange={handleOnChangeEvent}
					value={formData.name}
					error={formErrors?.name}
					name="name"
					placeholder="Digite seu nome"
					label="Nome de usuário"
				/>
				<Input
					type="text"
					onChange={handleOnChangeEvent}
					value={formData.email}
					error={formErrors?.email}
					name="email"
					placeholder="Digite seu email"
					label="Email"
				/>
				<Input
					type="text"
					onChange={handleOnChangeEvent}
					value={formData.phone}
					error={formErrors?.phone}
					name="phone"
					placeholder="(99) 99999-9999"
					label="Celular"
				/>
				<Input
					type="password"
					onChange={handleOnChangeEvent}
					value={formData.password}
					error={formErrors?.password}
					name="password"
					placeholder="Digite sua senha"
					label="Senha"
				/>
				<Input
					type="password"
					onChange={handleOnChangeEvent}
					value={formData.confirmedPassword}
					error={formErrors?.confirmedPassword}
					name="confirmedPassword"
					placeholder="Confirme sua senha"
					label="Confirmação de senha"
				/>

				<Button className="mt-6">Registrar</Button>
			</form>
		</>
	)
}
