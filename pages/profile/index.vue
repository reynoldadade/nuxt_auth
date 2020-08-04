<template>
	<div class="h-screen bg-gray-200">
		<div class="grid grid-cols-3 gap-4">
			<ProfileCard :profile="profile" />
			<div class="m-2 md:col-span-2 col-span-3">
				<p class="uppercase text-gray-500 font-bold">Your plans</p>
				<PlansComponent
					v-for="(sub, index) in profile.subscriptions"
					:key="index"
					:subscription="sub.subscription"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PlansComponent from '~/components/Plans';
import ProfileCard from '~/components/ProfileCard';
export default {
	layout: 'main',
	head() {
		return { title: 'Walulel | Account' };
	},
	data() {
		return {};
	},
	components: {
		PlansComponent,
		ProfileCard,
	},
	beforeMount() {
		if (this.profile == null || this.profile === undefined) {
		}
	},
	computed: {
		...mapGetters({
			profile: 'user/getProfile',
		}),
	},
	methods: {},
};
</script>

<style></style>
