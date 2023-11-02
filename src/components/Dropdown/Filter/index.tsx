import Input from "@/components/Input";

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
			<p className="font-bold text-lg">Favoritos</p>
		</>
	)
}
