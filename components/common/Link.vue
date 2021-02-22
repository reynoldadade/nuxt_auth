<template>
	<div class="text-center py-5">
		<p>
			{{ mainText }}
			<nuxt-link
				:to="link"
				class="font-semibold"
				:class="`text-${getUiConfig.color} _text-orange`"
				>{{ linkText }}</nuxt-link
			>
		</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	props: ['link', 'mainText', 'linkText'],
	computed: {
		...mapGetters({
			getUiConfig: 'components/getUiConfig',
		}),
	},
};
</script>

<style></style>
