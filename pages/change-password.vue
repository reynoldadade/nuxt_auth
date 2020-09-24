<template>
	<div class="w-full flex flex-wrap">
		<!-- Login Section -->
		<div class="w-full md:w-1/2 flex flex-col">
			<div
				class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24"
			>
				<a href="#" class="">
					<img
						src="~assets/images/walulel_black.png"
						alt=""
						class="h-12 w-12"
					/>
				</a>
			</div>

			<div
				class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32"
			>
				<p class="text-center text-3xl text-black">Change Password</p>
				<ChangePassword :email="email" :token="token" />
			</div>
		</div>
		<div class="xs:hidden md:w-1/2">
			<!-- <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_Advb2R.json"  background="transparent"  speed="1"  style="width: 100%; height: 100%;"  loop  autoplay></lottie-player> -->
			<img
				class="object-cover w-full h-screen hidden md:block"
				src="~assets/images/home-splash.jpg"
			/>
		</div>
	</div>
</template>

<script>
import ChangePassword from '@/components/ChangePassword';
export default {
	name: 'ChangePasswordPage',
	data() {
		return {
			email: null,
			token: null,
		};
	},
	components: {
		ChangePassword,
	},
	mounted() {
		this.email = this.$route.query.email;
		this.token = this.$route.query.token;
	},
};
</script>

<style></style>
