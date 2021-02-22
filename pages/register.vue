<template>
	<div class="w-full flex flex-wrap">
		<div class="xs:hidden md:w-1/2">
			<!-- <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_Advb2R.json"  background="transparent"  speed="1"  style="width: 100%; height: 100%;"  loop  autoplay></lottie-player> -->
			<img
				class="object-cover w-full h-screen hidden md:block"
				src="/images/home-splash.jpg"
			/>
		</div>
		<RegisterComponent />
	</div>
</template>

<script>
import RegisterComponent from '@/components/Register';
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
};
</script>

<style></style>
