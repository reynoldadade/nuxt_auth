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
};
</script>

<style></style>
