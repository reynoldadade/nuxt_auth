<template>
	<div>
		<div
			class="h-screen w-screen bg-blue-600 flex justify-center content-center flex-wrap"
		>
			<lottie-player
				src="https://assets4.lottiefiles.com/packages/lf20_vU6KP7/Astronaut/astronaout.json"
				background="transparent"
				speed="1"
				style="width: 100%; height: 100%;"
				loop
				autoplay
			></lottie-player>
		</div>

		<div
			class="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl"
		>
			<span class="opacity-50">Take me back to</span>
			<nuxt-link class="border-b" to="/">Login</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
.error-text {
	font-size: 130px;
}

@media (min-width: 768px) {
	.error-text {
		font-size: 220px;
	}
}
</style>
