interface ErrosMessages {
	[type: string]: { [category: string]: string };
}

export const ERROR_MESSAGES: ErrosMessages = {
	general: {
		empty: '* Campo obrigatório',
	},
	name: {
		invalidInput: 'O nome deve conter apenas letras.',
	},
	email: {
		invalidInput: 'O email deve ser válido. Ex.: example@example.com',
	},
	password: {
		invalidInput: 'A senha deve odebecer as regras: uma letra maíuscula [A-Z], uma letra minúscula [a-z], um caractere especial (Ex.: @#-), um número e ter pelo menos 8 caracteres.',
	},
	confirmedPassword: {
		notEqual: 'As senhas divergem.',
	},
	phone: {
		invalidInput: 'Digite um telefone válido',
	},
}
