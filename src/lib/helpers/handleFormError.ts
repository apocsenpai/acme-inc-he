import { ERROR_MESSAGES } from '@/lib/utils/constants/errorsMessages'
import {

	emailMatch,
	nameMatch,
	passwordMatch,
	phoneMatch,
} from '@/lib/utils/regex'

interface ErrorsValidator {
	[key: string]: (...args: string[]) => string;
}

interface FormErros {
	[key: string]: string;
}

const errorsValidator: ErrorsValidator = {
	email: (value: string) => validateEmail(value),
	password: (password: string) => validatePassword(password),
	confirmedPassword: (password: string, confirmedPassword: string) =>
		validateConfirmedPassword(password, confirmedPassword),
	name: (value: string) => validateName(value),
	phone: (value: string) => validatePhone(value),
}

export const handleFormErrors = (formData: FormErros) => {
	const errors: FormErros = {}

	const formKeyList = Object.keys(formData)

	formKeyList.forEach((key) => {
		const keyValue: string = formData[key]

		if (!keyValue) {
			errors[key] = ERROR_MESSAGES.general.empty
			return
		}

		const messagesError =
			key === 'confirmedPassword'
				? errorsValidator.confirmedPassword(
						formData['password'],
						formData['confirmedPassword'],
				  )
				: errorsValidator[key](keyValue)

		if (messagesError) errors[key] = messagesError
	})

	return Object.keys(errors).length ? errors : null
}


function validateEmail(email: string) {
	return !emailMatch.test(email) ? ERROR_MESSAGES.email.invalidInput : ''
}

function validatePassword(password: string) {
	return !passwordMatch.test(password)
		? ERROR_MESSAGES.password.invalidInput
		: ''
}

function validateConfirmedPassword(
	password: string,
	confirmedPassword: string,
) {
	return password !== confirmedPassword
		? ERROR_MESSAGES.confirmedPassword.notEqual
		: ''
}

function validateName(name: string) {
	return !nameMatch.test(name) ? ERROR_MESSAGES.name.invalidInput : ''
}


function validatePhone(phone: string) {
	return !phoneMatch.test(phone) ? ERROR_MESSAGES.phone.invalidInput : ''
}
