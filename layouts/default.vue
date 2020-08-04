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
	// middleware: ['checkLogin'],
};
</script>
<style></style>
