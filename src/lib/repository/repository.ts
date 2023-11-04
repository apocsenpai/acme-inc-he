function find<Type>(key: string): Type | null {
	if (typeof window !== 'undefined') {
		const storedItem = localStorage.getItem(key)
		if (storedItem !== null) {
			try {
				const item = JSON.parse(storedItem)
				return item
			} catch (error) {
				console.error(error)
			}
		}
	}
	return null
}

function create(key: string, value: Object) {
	if (typeof window !== 'undefined') {
		const stringifyObject = JSON.stringify(value)

		localStorage.setItem(key, stringifyObject)
	}
}

function remove(key: string) {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(key)
	}
}

const repository = { find, create, remove }

export default repository
