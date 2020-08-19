<template>
	<div>
		<Navbar />
		<nuxt />
		<client-only>
			<notifications group="foo" />
		</client-only>
	</div>
</template>

<script>
import Vue from 'vue';
import global from '~/mixins/global.js';
import Navbar from '@/components/common/Navbar';
Vue.mixin(global);
export default {
	middleware: ['profile'],
	components: {
		Navbar,
	},

	head() {
		return {
			link: [
				{
					href:
						'https://fonts.googleapis.com/css?family=Karla:400,700&display=swap',
					rel: 'stylesheet',
				},
				{
					href:'/css/styles.css',
					rel: 'stylesheet',
				},
			],
		};
	},
};
</script>

<style></style>
