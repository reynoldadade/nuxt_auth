<template>
	<form
		class="flex flex-col pt-3 md:pt-8"
		:class="{ shaker: error }"
		@submit.prevent="resetPassword"
	>
		<div class="flex flex-col pt-4">
			<label for="email" class="text-lg">Email</label>
			<input
				type="email"
				id="email"
				v-model="$v.email.$model"
				placeholder="your@email.com"
				required
				disabled
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>

		<div class="flex flex-col pt-4">
			<label for="password" class="text-lg">Password</label>
			<div class="flex">
				<input
					:type="showPassword ? 'text' : 'password'"
					id="password"
					v-model="$v.password.$model"
					placeholder="Password"
					required
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
				/>
				<button
					class="py-2 px-3 focus:outline-none"
					@click="showHidePassword"
					type="button"
				>
					<i
						:class="
							showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'
						"
					></i>
				</button>
			</div>

			<p class="text-red-500 text-xs italic" v-if="$v.password.$error">
				Make it crazy and
				{{
					$v.password.$params.minLength.min -
						$v.password.$model.length
				}}
				digits to go
			</p>
		</div>
		<div class="flex flex-col pt-4">
			<label for="password" class="text-lg">Confirm Password</label>
			<div class="flex">
				<input
					:type="showPassword ? 'text' : 'password'"
					id="password"
					v-model="$v.password_confirmation.$model"
					placeholder="Confirm Password"
					required
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
				/>
				<button
					class="py-2 px-3 focus:outline-none"
					@click="showHideConfirmationPassword"
					type="button"
				>
					<i
						:class="
							showConfirmationPassword
								? 'fas fa-eye'
								: 'fas fa-eye-slash'
						"
					></i>
				</button>
			</div>

			<p
				class="text-red-500 text-xs italic"
				v-if="$v.password_confirmation.$error"
			>
				Password is not the same
			</p>
		</div>
		<!-- <p class="text-xs text-red-500 font-bold mt-2 text-center" v-if="error">
			<i class="fas fa-exclamation-triangle"></i>
			{{ errorMessage }}
		</p> -->

		<button
			id="loginButton"
			type="submit"
			class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 disabled:opacity-75 disabled:cursor-not-allowed"
			:disabled="$v.$invalid || loading"
		>
			Change Password
			<i class="fas fa-circle-notch fa-spin" v-show="loading"></i>
		</button>
	</form>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
export default {
	data() {
		return {
			password: null,
			password_confirmation: null,
			loading: false,
			error: false,
			showPassword: false,
			showConfirmationPassword: false,
		};
	},
	props: {
		email: {
			type: String,
		},
		token: {
			type: String,
		},
	},
	validations: {
		email: {
			required,
			email,
		},
		password: {
			required,
			minLength: minLength(8),
		},
		password_confirmation: {
			required,
			sameAsPassword: sameAs('password'),
		},
	},

	computed: {
		formValid() {
			return (
				this.$v.password_confirmation.$invalid &&
				this.$v.password.$invalid
			);
		},
	},
	methods: {
		async resetPassword() {
			this.loading = true;
			this.$axios
				.$post(process.env.API_ENDPOINT + '/password/reset', {
					email: this.email,
					token: this.token,
					password: this.password,
					password_confirmation: this.password_confirmation,
				})
				.then(response => {
					this.loading = false;
					this.notify({
						title: 'Awesome',
						text: 'Your account password has been changed',
						type: 'success',
					});
					this.notify({
						title: 'Hi',
						text: 'You will be redirected to login in 3s',
						type: 'info',
					});
					setTimeout(() => window.location.replace('/'), 2000);
				})
				.catch(error => {
					this.loading = false;
					// console.log(error.response.status);
					switch (error.response.status) {
						case 401:
							return redirect('/change-password');
							break;
						case 404:
							return redirect('/404');
							break;
						case 422:
							this.notify({
								title: 'Sorry',
								text:
									'Something went wrong on our side, we will check it out whilst you try again',
								type: 'error',
							});
							break;
						case 500:
							this.notify({
								title: 'Sorry',
								text: 'Internal Server error, please try again',
								type: 'error',
							});
							break;
					}
				});
		},
		showHidePassword() {
			this.showPassword = !this.showPassword;
		},
		showHideConfirmationPassword() {
			this.showConfirmationPassword = !this.showConfirmationPassword;
		},
	},
};
</script>

<style></style>
