<template>
	<div class="grid  grid-cols-3">
		<div
			class="bg-white sm:max-w-full max-w-md rounded overflow-hidden h-full col-span-1 col-start-2"
		>
			<div class="text-center p-6  border-b">
				<img
					class="h-24 w-24 rounded-full mx-auto"
					:src="profile.avatar"
					alt="profile-picture"
				/>
				<p class="pt-2 text-lg font-semibold">
					{{ profile.name }}
				</p>
				<p class="pt-2 text-xs font-bold">
					{{ profile.username }}
				</p>
				<p class="text-sm text-gray-600">
					{{ profile.email }}
				</p>

				<div class="mt-5">
					<nuxt-link
						to="profile/edit"
						class="border rounded-full py-2 px-4 text-xs font-semibold text-gray-700 hover:text-white hover:bg-black"
						>Manage your Walulel Account</nuxt-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	layout: 'main',
	data() {
		return {};
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
