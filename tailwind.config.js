/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const {
	colors: { orange },
} = require('tailwindcss/defaultTheme');
module.exports = {
	theme: {
		extend: {
			colors: {
				orange: orange,
			},
		},
	},
	variants: {
		opacity: ['disabled', 'responsive', 'focus', 'hover'],
		cursor: ['responsive', 'hover', 'focus', 'disabled'],
	},
	plugins: [],
	purge: {
		// Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
		enabled: process.env.NODE_ENV === 'production',
		content: [
			'components/**/*.vue',
			'layouts/**/*.vue',
			'pages/**/*.vue',
			'plugins/**/*.js',
			'nuxt.config.js',
		],
	},
};
