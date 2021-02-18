<template>
	<div class="w-full flex flex-wrap h-screen items-center p-2">
		<!-- Login Section -->
		<div class="h-full w-1/2 flex flex-col justify-around">
			<div class="w-full flex flex-col items-center">
				<div class="flex justify-around w-full">
					<a href="#" class="">
						<img
							src="~assets/images/walulel_black.png"
							alt=""
							class="h-12 w-12"
						/>
					</a>
				</div>

				<div class="flex flex-col w-2/3">
					<p class="text-center text-3xl" :class="`text-black`">
						Login
					</p>
					<LoginForm />

					<Link
						link="/register"
						mainText="Don't have an account?"
						linkText="Sign Up Here."
					/>
				</div>
			</div>
			<div
				class="flex justify-around p-1"
				:class="`text-${getUiConfig.color}`"
			>
				<div>FAQ</div>
				<div>Help</div>
				<div>Legal Notices</div>
			</div>
		</div>
		<div
			class="xs:hidden md:w-1/2 flex flex-col justify-around items-center"
		>
			<object
				type="image/svg+xml"
				:data="`/${getUiConfig.logo}`"
				class="logo mb-5"
			>
				404 logo
				<!-- fallback image in CSS -->
				<style>
					.logo {
						width: 50%;
						height: 100%;
					}
				</style>
			</object>
			<div class="w-2/3 text-center" :class="`text-${getUiConfig.color}`">
				{{ getUiConfig.caption }}
			</div>
		</div>
	</div>
</template>

<script>
import LoginForm from '~/components/LoginForm';
import Link from '~/components/common/Link';
import { mapGetters } from 'vuex';
export default {
	head() {
		return { title: 'Walulel | Login' };
	},
	middleware: ['checkLogin'],
	components: {
		LoginForm,
		Link,
	},
	computed: {
		...mapGetters({
			getUiConfig: 'components/getUiConfig',
		}),
	},
};
</script>

<style></style>
