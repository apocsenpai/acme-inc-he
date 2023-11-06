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

			const comparePassword = bcryptjs.compareSync(password, user.password)

			if (!comparePassword)
				return reject(new Error('Email ou senha inválidos!'))

			resolve(
				repository.create('authenticated', {
					email,
					phone: user?.phone,
					favorites: user?.favorites || {},
				})
			)
		}, 800)
	})
}

export function favoriteItem(email: string, productId: number) {
	const users = repository.find<IUser[]>('users')

	if(!users) return null

	const userIndex = users.findIndex((user) => user.email === email)

	users[userIndex] = {
		...users[userIndex],
		favorites: {
			...users[userIndex]?.favorites,
			[productId]: true,
		},
	}

	repository.create('users', users)
	repository.create('authenticated', users[userIndex])
}

export function removeFavorite(email: string, productId: number) {
	const users = repository.find<IUser[]>('users')

	if(!users) return null

	const userIndex = users.findIndex((user) => user.email === email)

	delete users[userIndex].favorites[productId]

	repository.create('users', users)
	repository.create('authenticated', users[userIndex])
}

export function getAuthenticated() {
	return repository.find<IUser>('authenticated')
}

export function logoutUser() {
	return repository.remove('authenticated')
}

function findUserAlreadyExists(users: IUser[], currentEmail: string) {
	return users.find(({ email }) => currentEmail === email)
}
