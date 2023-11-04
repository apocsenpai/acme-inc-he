import { IUser } from '../interfaces/User'
import repository from '../repository/repository'
import bcryptjs from 'bcryptjs'

export async function createUser(bodyUser: IUser) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const data = repository.find<IUser[]>('users')

			const user = {
				...bodyUser,
				password: bcryptjs.hashSync(bodyUser.password, 10),
			}

			if (!data) {
				repository.create('authenticated', {
					email: bodyUser.email,
					phone: bodyUser.phone,
				})

				return resolve(repository.create('users', [user]))
			}

			const userAlreadyExists = findUserAlreadyExists(data, user.email)

			if (userAlreadyExists)
				return reject(
					new Error('Conflict - Houve um erro ao tentar cadastrar o usuário!')
				)

			repository.create('authenticated', {
				email: bodyUser.email,
				phone: bodyUser.phone,
			})
			resolve(repository.create('users', [...data, user]))
		}, 800)
	})
}

export async function signInUser({
	email,
	password,
}: {
	email: string,
	password: string,
}) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const data = repository.find<IUser[]>('users')

			if (!data) return reject(new Error('Email ou senha inválidos!'))

			const user = findUserAlreadyExists(data, email)

			if (!user) return reject(new Error('Email ou senha inválidos!'))

			resolve(repository.create('authenticated', { email, phone: user?.phone }))
		}, 800)
	})
}

function findUserAlreadyExists(users: IUser[], currentEmail: string) {
	return users.find(({ email }) => currentEmail === email)
}
