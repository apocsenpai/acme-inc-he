import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				'3xl': '1900px',
			},
			fontFamily: {
				sans: 'var(--font-barlow)',
				alt: 'var(--font-khand)',
			},
			boxShadow: {
				header: '0px 2px 8px 0px #66201B1D',
			},
			animation:{
				slideCart: 'slideToLeft 300ms ease-out forwards',
			},
			keyframes:{
				slideToLeft: {
					'0%': {right: '-100%'},
					'100%': {right: '0'}
				}
			},
			colors: {
				primary: '#EE4246',
				secondary: '#201B1D',
				alternative: '#EA943B',
				background: '#fff',
			},
		},
	},
	plugins: [],
}
export default config
