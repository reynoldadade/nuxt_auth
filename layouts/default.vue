<template>
	<div>
		<nuxt />

		<client-only>
			<notifications group="foo" />
		</client-only>
	</div>
</template>

<script>
import Vue from 'vue';
import global from '~/mixins/global.js';
Vue.mixin(global);
export default {
	transition: {
		name: 'page',
		mode: 'out-in',
	},

	middleware: ['changeLogos'],

	head() {
		return {
			script: [
				{
					src:
						'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
					body: true,
				},
			],
			link: [
				{
					href:
						'https://fonts.googleapis.com/css?family=Karla:400,700&display=swap',
					rel: 'stylesheet',
				},
				{
					href: '/css/styles.css',
					rel: 'stylesheet',
				},
			],
		};
	},
};
</script>
<style>
::selection {
	background-color: rgb(255, 219, 160);
}
</style>
