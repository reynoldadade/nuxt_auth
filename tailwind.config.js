/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
	theme: {
		extend: {
			colors: {
				'wa-orange': '#F37A39',
				'wa-blue': '#497BC7',
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
