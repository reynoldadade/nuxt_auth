export default {
	mode: 'spa',
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'Walulel Company Limited',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || '',
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
		script: [{ src: '/js/mixpanel.js' }],
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	/*
	 ** Global CSS
	 */
	css: ['~/node_modules/@fortawesome/fontawesome-free/css/all.css'],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'~/plugins/vuelidate.js',
		'~/plugins/axios.js',
		{ src: '~/plugins/notify.js', mode: 'client' },
		'~/plugins/vue-tel-input.js',
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/nuxt-tailwindcss
		'@nuxtjs/tailwindcss',
	],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		// Doc: https://github.com/nuxt-community/dotenv-module
		'@nuxtjs/dotenv',
		'cookie-universal-nuxt',
		'vue-sweetalert2/nuxt',
	],
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {
		https: true,
		baseURL: process.env.API_ENDPOINT,
	},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {},
		vendor: ['vuelidate'],
	},
	/*
	 ** Environment Variables
	 */

	env: {},
};
