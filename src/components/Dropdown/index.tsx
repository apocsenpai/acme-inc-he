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
		<div className="relative w-64">
			<button
				className="flex text-3xl w-full font-bold items-center gap-3 hover:text-alternative"
				onClick={toggleDropdown}
			>
				{icon} {title}
			</button>
			<div className='w-full absolute right-8 h-60 z-10 overflow-hidden'>
            <div
					className={`w-full bg-background absolute shadow-xl p-4 rounded-lg border
                        border-secondary transition-all duration-300 ${
													active ? 'top-[1rem]' : '-top-40'
												}`}
				>
					{active && <>{children}</>}
				</div>
			</div>
		</div>
	)
}
