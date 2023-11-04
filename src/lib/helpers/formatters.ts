export const formatPrice = (price: number) => price.toFixed(2).replace('.',',')


function normalizeCpf(cpf: string) {
	if (!cpf) return ''

	return cpf
		.replace(/[\D]/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(.\d{3})(\d)/, '$1.$2')
		.replace(/(.\d{3})(\d)/, '$1-$2')
		.replace(/(-\d{2})(\d+?)/, '$1')
}

function normalizeDate(date: string) {
	if (!date) return ''

	return date
		.replace(/[\D]/g, '')
		.replace(/(\d{2})(\d)/, '$1/$2')
		.replace(/(\/\d{2})(\d)/, '$1/$2')
		.replace(/(\/\d{4})(\d+?)/, '$1')
}

function normalizePhoneNumber(phoneNumber: string) {
	if (!phoneNumber) return ''

	return phoneNumber
		.replace(/[\D]/g, '')
		.replace(/(\d{2})(\d)/, '($1) $2')
		.replace(/(\d{5})(\d)/, '$1-$2')
		.replace(/(-\d{4})(\d+?)/, '$1')
}

function normalizeCep(cep: string) {
	if (!cep) return ''

	return cep
		.replace(/[\D]/g, '')
		.replace(/(\d{5})(\d)/, '$1-$2')
		.replace(/(-\d{3})(\d+?)/, '$1')
}

function normalizeNumber(number: string) {
	if (!number) return ''

	return number.replace(/[\D]/g, '')
}


export const normalize: { [key: string]: (value: string) => string } = {
	cpf: normalizeCpf,
	birthday: normalizeDate,
	phone: normalizePhoneNumber,
	zipCode: normalizeCep,
	number: normalizeNumber,
}