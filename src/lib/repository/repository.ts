"use client"

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

function remove(key: string){
	db().removeItem(key)
}

const repository = { find, create, remove }

export default repository
