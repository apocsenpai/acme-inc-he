function db() {
	const storage = window.localStorage

	return storage
}

function find<Type>(key: string): Type {
	const item = db().getItem(key)

	return item ? JSON.parse(item) : null
}

function create(key: string, value: Object) {
	const stringifyObject = JSON.stringify(value)

	db().setItem(key, stringifyObject)
}

const repository = { find, create }

export default repository
