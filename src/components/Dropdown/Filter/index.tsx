import Input from '@/components/Input'

export default function Filter() {
	return (
		<>
			<p className="font-bold text-lg">Nome</p>
			<Input />
			<div className="flex items-center gap-3">
				<span className="bg-alternative flex-grow border-t border-secondary inline-block"></span>
				<span>ou</span>
				<span className="bg-alternative flex-grow border-t border-secondary inline-block"></span>
			</div>
			<div className="flex gap-2 items-center cursor-pointer mt-2">
				<input
					type="checkbox"
					className="w-5 h-5 mt-1 cursor-pointer checked:bg-alternative appearance-none border border-secondary rounded"
					id="favorites"
					name="favorites"
				/>
				<label className="cursor-pointer font-bold text-lg" htmlFor="favorites">
					Favoritos
				</label>
			</div>
		</>
	)
}
