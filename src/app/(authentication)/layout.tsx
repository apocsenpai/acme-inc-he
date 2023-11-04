import BrandSide from "@/components/Authentication/BrandSide";
import FormSide from "@/components/Authentication/FormSide";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className="min-h-screen grid grid-cols-1 lg:grid-cols-[2fr_1fr] ">
			<BrandSide />
			<FormSide> {children}</FormSide>
		</main>
	)
}
