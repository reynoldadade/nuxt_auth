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
				<p class="text-center text-3xl text-black">Welcome.</p>
				<form
					class="flex flex-col pt-3 md:pt-8"
					:class="{ shaker: error }"
					@submit.prevent="login()"
				>
					<div class="flex flex-col pt-4">
						<label for="email" class="text-lg">Email</label>
						<input
							type="email"
							id="email"
							v-model="$v.email.$model"
							placeholder="your@email.com"
							required
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>

					<div class="flex flex-col pt-4">
						<label for="password" class="text-lg">Password</label>
						<input
							type="password"
							id="password"
							v-model="$v.password.$model"
							placeholder="Password"
							required
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<p
						class="text-xs text-red-500 font-bold mt-2 text-center"
						v-if="error"
					>
						<i class="fas fa-exclamation-triangle"></i>
						{{ errorMessage }}
					</p>

					<button
						type="submit"
						:disabled="$v.$invalid"
						class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 disabled:opacity-75 disabled:cursor-not-allowed"
					>
						Log In
						<i
							class="fas fa-circle-notch fa-spin"
							v-if="loading"
						></i>
					</button>
				</form>
				<div class="text-center pt-12 pb-12">
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
import { required, email } from 'vuelidate/lib/validators';
export default {
	head() {
		return { title: 'Walulel | Login' };
	},
	data() {
		return {
			email: '',
			password: '',
			loading: false,
			error: false,
			errorMessage: 'Incorrect username/password.',
		};
	},
	components: {},
	validations: {
		email: {
			required,
			email,
		},
		password: {
			required,
		},
	},
	methods: {
		async login() {
			this.error = false;
			this.loading = true;
			this.$axios
				.$post('auth/login', {
					email: this.email,
					password: this.password,
				})
				.then(({ data }) => {
					this.loading = false;
					//console.log(data);
					this.$cookies.set('token', data.access_token, {
						path: '/',
						sameSite: true,
						maxAge: 60 * 60 * 24 * 7,
					});
				})
				.catch(({ message, response }) => {
					this.loading = false;
					if (response.data.error) {
						this.errorMessage = response.data.error;
					}
					this.error = true;
				});
		},
	},
};
</script>

<style></style>
