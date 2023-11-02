import { PropsWithChildren, ReactElement, useState } from 'react'

interface DropdownProps extends PropsWithChildren {
	icon: ReactElement;
	title: string;
}

export default function Dropdown({
	icon,
	title,
	children,
}: Readonly<DropdownProps>) {
	const [active, setActive] = useState(false)

	const toggleDropdown = () => setActive(!active)

	return (
		<div className="relative">
			<button
				className="flex text-3xl w-full font-bold items-center gap-3 hover:text-primary"
				onClick={toggleDropdown}
			>
				{icon} {title}
			</button>
			<div className='w-64 absolute -left-12 h-60 z-10 overflow-hidden'>
            <div
					className={`w-full bg-background absolute shadow-xl p-4 rounded-lg border
                        border-secondary transition-all duration-300 ${
													active ? 'top-[1rem]' : '-top-full'
												}`}
				>
					{children}
				</div>
			</div>
		</div>
	)
}
