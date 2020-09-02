<template>
	<div
		class="flex p-3 justify-between text-blue-700 font-bold bg-white shadow"
	>
		<div class="flex-1">
			<img
				src="~assets/images/walulel_black.png"
				alt=""
				class="h-12 w-12"
			/>
		</div>
		<div class="flex-1 relative justify-end flex flex-end">
			<div @mouseover="isOpen = true" @mouseleave="isOpen = false">
				<img
					:src="profile.avatar"
					alt=""
					class="rounded-full w-10 h-10"
				/>
				<div
					class="absolute p-1 right-0 bg-white text-right shadow-xl"
					style="top:102%; z-index:1000; width:200px"
					v-show="isOpen"
				>
					<ul>
						<li
							class="hover:bg-gray-200 p-1"
							@click="$router.push('/profile')"
							role="button"
						>
							Profile
						</li>
						<li
							class="hover:bg-gray-200 p-1"
							@click="logout"
							role="button"
						>
							Sign Out
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			isOpen: false,
		};
	},
	computed: {
		...mapGetters({
			profile: 'user/getProfile',
		}),
	},
	methods: {
		logout() {
			this.$cookies.removeAll();
			window.location.replace('/');
		},
	},
};
</script>

<style></style>
