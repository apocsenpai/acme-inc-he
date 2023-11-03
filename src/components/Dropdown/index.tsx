import {
	MouseEvent,
	PropsWithChildren,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react'

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
	const container = useRef<HTMLDivElement | null>(null)

	const toggleDropdown = () => setActive(!active)

	useEffect(() => {
		const handleClickOutside  = (e: Event) => {
			const target = e.target as HTMLElement;

			if (container?.current && !container?.current.contains(target)) {
				setActive(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.addEventListener('mousedown', handleClickOutside)
		}
	}, [container])

	return (
		<div className="relative" ref={container}>
			<button
				className={`flex text-3xl w-full font-bold items-center gap-3 hover:text-primary ${
					active && 'text-primary'
				}`}
				onClick={toggleDropdown}
			>
				{icon} {title}
			</button>
			<div className="w-64 absolute -left-12 h-60 z-10 overflow-hidden">
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
