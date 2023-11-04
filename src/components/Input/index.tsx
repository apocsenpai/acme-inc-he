import { InputHTMLAttributes, ReactElement } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	icon?: ReactElement;
}

export default function Input(props: Readonly<InputProps>) {
	return (
		<div className="mb-2 relative">
			{props.label && (
				<label
					className={`text-xl font-bold ${props.error && 'text-secondary'}`}
					htmlFor={props.name}
				>
					{props.label}
				</label>
			)}
			<input
				className={`
						w-full h-12 text-xl rounded-md mt-1 pl-4 border
						focus:outline-none
						read-only:placeholder:italic read-only:bg-zinc-200 read-only:hover:cursor-not-allowed
						${
							props.error
								? 'text-[#ff0000] border-[#ff0000]'
								: 'border-secondary hover:border-primary focus:border-alternative'
						}
						peer
				`}
				{...props}
			/>
			{props.icon && <span className='absolute right-4 top-3 peer-focus:text-primary peer-hover:text-primary'>{props.icon}</span>}
			{props.error && (
				<span className="text-base font-bold text-[#ff0000] italic">{props.error}</span>
			)}
		</div>
	)
}
