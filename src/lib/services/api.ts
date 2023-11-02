'use client'

function api() {
	const storage = window.localStorage

	return storage
}

async function get(key: string) {
	const item = api().getItem(key)

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (item) return resolve({ data: item })

			reject(new Error(`Não foi possível obter "${key}"`))
		}, 1500)
	})
}

async function post(key: string, value: Object) {
	const stringifyObject = JSON.stringify(value)

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			api().setItem(key, stringifyObject)

			resolve({})
		}, 1500)
	})
}

export default api
