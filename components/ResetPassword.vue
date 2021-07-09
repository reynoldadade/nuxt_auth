<template>
	<div>
		<div class="text-center">
			<a class="">
				<img src="/images/walulel_black.png" alt="" class="h-12 w-12" />
			</a>
			<p class="font-bold text-xl mb-2">Reset Password</p>
		</div>
		<form @submit.prevent="emailReset" v-if="!success">
			<p class="text-center">
				Your password will be reset in seconds just provide us with your
				email
			</p>
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
					<p class="text-black text-xs italic" v-if="$v.email.$error">
						This is not a valid email
					</p>
					<div
						class="text-center text-red-500"
						v-if="error"
						:class="{ shaker: error }"
					>
						<p>
							<i class="fas fa-exclamation-triangle"></i>
							{{ resetError }}
						</p>
					</div>
				</div>
			</div>
			<button
				class="block w-full bg-black text-white font-bold p-2 rounded mt-4 disabled:opacity-75 disabled:cursor-not-allowed"
				type="submit"
				:disabled="$v.$invalid"
			>
				Reset Password
				<i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
			</button>
		</form>
		<div v-else class="text-center">
			<h2 class="text-lg font-bold">You've got mail!</h2>
			<p class="text-center">
				We have sent a password reset link to your email. <br />
				Kindly check your inbox
			</p>
		</div>
	</div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
	name: 'resetPasswordComponent',
	data() {
		return {
			email: '',
			loading: false,
			resetError: '',
			error: false,
			success: false,
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
			this.loading = true;
			axios
				.get(process.env.API_ENDPOINT + '/password/email', {
					params: { email: this.email },
				})
				.then(response => {
					this.notify({
						text: 'A reset link has been sent to your mail',
						title: 'Psst',
						type: 'success',
					});
					this.loading = false;
					this.success = true;
				})
				.catch(error => {
					this.error = true;
					this.loading = false;
					if (error.response.status === 422) {
						this.resetError = 'Email address not found';
					}
				});
		},
	},
};
</script>

<style></style>
