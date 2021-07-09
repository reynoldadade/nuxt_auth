<template>
	<div class="flex w-full flex-wrap h-screen">
		<div class="xs:hidden md:w-1/2 flex-1 flex justify-around">
			<!-- <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_Advb2R.json"  background="transparent"  speed="1"  style="width: 100%; height: 100%;"  loop  autoplay></lottie-player> -->
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
		</div>
		<div
			class="bg-white  px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full md:w-1/2 self-center"
		>
			<ResetPasswordComponent />
			<Link mainText="Back to Login?" link="/" linkText="Click here" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ResetPasswordComponent from '@/components/ResetPassword';
import Link from '@/components/common/Link';
export default {
	name: 'resetPassword',
	layout: 'default',
	head() {
		return {
			title: 'Walulel | Register',
		};
	},
	components: {
		ResetPasswordComponent,
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
