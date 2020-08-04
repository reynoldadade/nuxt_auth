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
				<p class="text-center text-3xl text-black">Welcome</p>
				<LoginForm />

				<div class="text-center pt-5 pb-12">
					<p>
						Forgotten Password?
						<nuxt-link
							to="/resetPassword"
							class="underline font-semibold"
							>Get help here.</nuxt-link
						>
					</p>
				</div>
				<div class="text-center pt-12 pb-12">
					<hr class="h-2" />
					<p>
						Don't have an account?
						<nuxt-link
							to="/register"
							class="underline font-semibold"
							>Register here.</nuxt-link
						>
					</p>
				</div>
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
import LoginForm from '~/components/LoginForm';
export default {
	head() {
		return { title: 'Walulel | Login' };
	},
	middleware: ['checkLogin'],
	components: {
		LoginForm,
	},
};
</script>

<style></style>
