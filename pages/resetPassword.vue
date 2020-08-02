<template>
	<div class="flex w-full flex-wrap">
		<div class="xs:hidden md:w-1/2">
			<!-- <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_Advb2R.json"  background="transparent"  speed="1"  style="width: 100%; height: 100%;"  loop  autoplay></lottie-player> -->
			<img
				class="object-cover w-full h-screen hidden md:block"
				src="~assets/images/home-splash.jpg"
			/>
		</div>
		<div
			class="bg-white  px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full md:w-1/2"
		>
			<div class="text-center">
				<a class="">
					<img
						src="~assets/images/walulel_black.png"
						alt=""
						class="h-12 w-12"
					/>
				</a>
				<p class="font-bold text-xl mb-2">Reset Password</p>
				<p>
					Your password will be reset in seconds just provide us with
					your email
				</p>
			</div>
			<form @submit.prevent="emailReset">
				<div class="-mx-3 md:flex mb-6">
					<div class="w-full px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
							for="grid-email"
						>
							Email
						</label>
						<input
							class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
							id="grid-email"
							type="email"
							placeholder="somebody@nobody.com"
							v-model="$v.email.$model"
							required
							name="email"
						/>
						<p
							class="text-black text-xs italic"
							v-if="$v.email.$error"
						>
							This is not a valid email
						</p>
					</div>
				</div>
				<button
					class="block w-full bg-black text-white font-bold p-2 rounded mt-4 disabled:opacity-75 disabled:cursor-not-allowed"
					type="submit"
					:disabled="$v.$invalid"
				>
					Register
					<i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import axios from 'axios';
export default {
	name: 'resetPassword',
	layout: 'default',
	head() {
		return {
			title: 'Walulel | Register',
		};
	},
	data() {
		return {
			email: '',
			loading: false,
		};
	},
	validations: {
		email: {
			required,
			email,
		},
	},
	methods: {
		async emailReset() {
			this.$axios
				.get('/password/email', { params: { email: this.email } })
				.then(response => console.log(response))
				.catch(error => console.log(error.response));
		},
	},
};
</script>

<style></style>
