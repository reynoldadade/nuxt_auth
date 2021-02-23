<template>
	<div class="flex flex-wrap flex-row-reverse relative">
		<div
			class="_product-logo hidden lg:flex lg:w-1/2 max-h-full flex-col justify-center items-center"
		>
			<img
				:src="`/${getUiConfig.logo}`"
				class="logo mb-5"
				:class="{
					'w-3/5 xl:w-2/4': getUiConfig.logo === 'WaInsight.svg',
					'w-2/4 xl:w-2/5': getUiConfig.logo === 'WaCommunicate.svg',
					'w-1/4': getUiConfig.logo === 'IconBlack.svg',
				}"
			/>
			<p
				class="w-full md:w-2/3 text-center mt-8"
				:class="`text-${getUiConfig.color} text-lg font-semibold`"
			>
				{{ getUiConfig.caption }}
			</p>
		</div>
		<RegisterComponent />
	</div>
</template>

<script>
import RegisterComponent from '@/components/Register';
import { mapGetters } from 'vuex';
export default {
	name: 'register',
	layout: 'default',
	head() {
		return {
			title: 'Walulel | Register',
		};
	},
	components: {
		RegisterComponent,
	},
	computed: {
		...mapGetters({
			getUiConfig: 'components/getUiConfig',
		}),
	},
	mounted() {
		console.log(this.getUiConfig);
	},
};
</script>

<style scope>
._product-logo {
	background-color: #fbfbfb;
}
</style>
