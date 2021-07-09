<template>
	<div class="py-5" :class="{ 'text-center': textCenter }">
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
	props: {
		link: {
			type: String,
			required: true,
		},
		mainText: {
			type: String,
			required: true,
		},
		linkText: {
			type: String,
			required: true,
		},
		textCenter: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	computed: {
		...mapGetters({
			getUiConfig: 'components/getUiConfig',
		}),
	},
};
</script>

<style></style>
