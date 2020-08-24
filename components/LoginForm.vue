<template>
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
		<p class="text-xs text-red-500 font-bold mt-2 text-center" v-if="error">
			<i class="fas fa-exclamation-triangle"></i>
			{{ errorMessage }}
		</p>

		<button
			id="loginButton"
			type="submit"
			:disabled="$v.$invalid"
			class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 disabled:opacity-75 disabled:cursor-not-allowed"
		>
			Log In
			<i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
		</button>
	</form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
export default {
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
		...mapActions({
			storePermissions: 'user/storePermissions',
		}),

		async login() {
			const { redirect_url, expect_token } = this.$route.query;
			this.error = false;
			this.loading = true;
			this.$axios
				.$post('auth/login', {
					email: this.email,
					password: this.password,
				})
				.then(({ data }) => {
					this.loading = false;
					// console.log(data);
					this.$cookies.set('s_token', data.access_token, {
						path: '/',
						sameSite: true,
						maxAge: 60 * 60 * 24 * 7,
					});
					if (redirect_url) {
						const outURL = `http://${redirect_url}?token=${data.access_token}`;
						return window.location.replace(outURL);
					}
					this.$router.push('/profile');
				})
				.catch(({ message, response }) => {
					this.loading = false;
					if (response && response.data) {
						this.errorMessage = response.data.error;
					}
					this.error = true;
				});
		},
	},
};
</script>

<style></style>
