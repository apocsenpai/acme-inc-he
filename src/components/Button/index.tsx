import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
	return (
		<button
			className={`flex justify-center items-center gap-4 w-full text-3xl font-bold p-3 rounded-xl border
                    transition-all bg-secondary
                    text-white hover:bg-alternative hover:text-secondary`}
			{...props}
		>
			{props.children}
		</button>
	)
}
