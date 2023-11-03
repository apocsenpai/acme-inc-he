import { IProduct } from '../interfaces/Products'
import repository from '../repository/repository'
import { ADJECTIVES, VERBS } from '../utils/constants/mocks'
import { CHARACTERS } from '../utils/constants/values'
import { getRandomNumber } from './general'

interface ProductNameListMap {
	[verbIndex: string]: { [adjectiveIndex: string]: boolean };
}

const stringifiedProductMap =
	typeof window !== 'undefined' &&
	window.localStorage.getItem('productNameListMap')

const productNameListMap: ProductNameListMap = stringifiedProductMap
	? JSON.parse(stringifiedProductMap)
	: {}

function getImage() {
	const randomId = getRandomNumber(900, 1)

	return `https://picsum.photos/id/${randomId}/500/500`
}

function getName() {
	let randomVerbIndex = getRandomNumber(VERBS.length, 0)
	let randomAdjectiveIndex = getRandomNumber(ADJECTIVES.length, 0)
	// comment - possível while true
	while (productNameListMap[randomVerbIndex]?.[randomAdjectiveIndex]) {
		randomVerbIndex = getRandomNumber(VERBS.length, 0)
		randomAdjectiveIndex = getRandomNumber(ADJECTIVES.length, 0)
	}

	productNameListMap[randomVerbIndex] = {
		...productNameListMap[randomVerbIndex],
		[randomAdjectiveIndex]: true,
	}

	return `${VERBS[randomVerbIndex]} ${ADJECTIVES[randomAdjectiveIndex]}`
}

function getDescription() {
	const randomLength = getRandomNumber(500, 20)

	let stringAleatoria = ''

	for (let i = 0; i < randomLength; i++) {
		stringAleatoria += CHARACTERS.charAt(getRandomNumber(CHARACTERS.length, 0))
	}

	return stringAleatoria
}

function hasDiscount() {
	return getRandomNumber(100, 0) < 5
}

function getPrice(name: string, description: string) {
	const nameLength = name.length
	const descrLength = description.length

	return Number(
		(-1 * (10 + nameLength * ((500 - descrLength) / (4 - nameLength)))).toFixed(
			2
		)
	)
}

function getRandomProduct(id: number) {
	const name = getName()
	const description = getDescription()

	return {
		id,
		name,
		description,
		price: getPrice(name, description),
		imageUrl: getImage(),
		discount: hasDiscount(),
	}
}

function productListGenerator(size: number): IProduct[] {
	const productList = Array.from({ length: size }, (element, index) =>
		getRandomProduct(index + 1)
	)

	repository.create('productNameListMap', productNameListMap)

	repository.create('productList', productList)

	return productList
}

export default productListGenerator
