<template>
	<div class="h-screen bg-gray-200">
		<div
			class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4  mx-40"
		>
			<ProfileCard :profile="profile" />
			<div class="my-2  md:col-span-2 col-span-3 mx-10 sm:mx-0">
				<p class="uppercase text-gray-500 font-bold">Your plans</p>
				<PlansComponent
					v-for="(sub, index) in profile.subscriptions"
					:key="index"
					:subscription="sub.subscription"
				/>
				<div class="text-gray-500 text-sm w-full bg-white p-2">
					<span class="font-bold">No Plans?</span> view all our
					available
					<a
						:href="productsLink"
						class="text-blue-500 hover:underline font-bold"
						>products</a
					>
				</div>
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
		productsLink() {
			return `${
				process.env.WALULEL_LINK
			}/products?token=${this.$cookies.get('s_token')}`;
		},
	},
	methods: {},
};
</script>

<style></style>
