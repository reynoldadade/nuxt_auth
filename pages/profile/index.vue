<template>
	<div class="h-screen bg-gray-200">
		<div class="grid grid-cols-3 gap-4">
			<div
				class="container mx-10 max-w-sm rounded-lg overflow-hidden shadow-lg my-2 bg-white md:col-span-1 col-span-3"
			>
				<div
					class="relative z-10"
					style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));"
				>
					<img
						class="w-full"
						:src="profile.avatar"
						alt="Profile image"
					/>
				</div>
				<div
					class="relative flex justify-between items-center flex-row px-6 z-50 -mt-10"
				>
					<p class="flex items-center text-gray-400">
						<span
							class="inline-block w-3 h-3 rounded-full mr-2"
							:class="
								profile.active ? 'bg-green-500' : 'bg-red-500'
							"
						></span
						>active
					</p>
					<button
						@click="$router.push('/profile/edit')"
						class="p-4 bg-black rounded-full hover:bg-red-500 focus:bg-red-700 transition ease-in duration-200 focus:outline-none"
					>
						<i class="fas fa-user-edit w-6 h-6 text-white"></i>
					</button>
				</div>
				<div class="pt-6 pb-8 text-gray-600 text-center">
					<p>{{ profile.name }}</p>
					<p class="text-sm font-bold">{{ profile.email }}</p>
					<p class="text-lg font-semibold text-blue-300">
						{{ profile.phone_number }}
					</p>
				</div>

				<div
					class="pb-10 uppercase text-center tracking-wide flex justify-around"
				>
					<div>
						<p class="text-gray-400 text-sm">Country</p>
						<p class="text-lg font-semibold text-blue-400">
							{{ profile.country }}
						</p>
					</div>

					<div>
						<p class="text-gray-400 text-sm">Username</p>
						<p class="text-lg font-semibold text-blue-400">
							@{{ profile.username }}
						</p>
					</div>
					<div>
						<p class="text-gray-400 text-sm">PostCode</p>
						<p class="text-lg font-semibold text-blue-400">
							{{ profile.postcode }}
						</p>
					</div>
				</div>
			</div>
			<div class="m-2 md:col-span-2 col-span-3">
				<p class="uppercase text-gray-500 font-bold">Your plans</p>
				<ProfileCardComponent
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
import ProfileCardComponent from '~/components/ProfileCard';
export default {
	layout: 'main',
	data() {
		return {};
	},
	components: {
		ProfileCardComponent,
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
