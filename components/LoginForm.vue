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
		</div>
		<p class="text-xs text-red-500 font-bold mt-2 text-center" v-if="error">
			<i class="fas fa-exclamation-triangle"></i>
			{{ errorMessage }}
		</p>

		<button
			id="loginButton"
			type="submit"
			:disabled="formValid"
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
			showPassword: false,
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
	computed: {
		formValid() {
			return this.$v.email.$invalid && this.$v.password.$invalid;
		},
	},
	methods: {
		...mapActions({
			storePermissions: 'user/storePermissions',
		}),
		showHidePassword() {
			this.showPassword = !this.showPassword;
		},

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

						maxAge: 60 * 60 * 24 * 7,
						// secure: true,
					});
					mixpanel.track('User Logged', {
						User: data.user.name,
						'Login time': new Date().toLocaleString(),
					});

					mixpanel.identify(data.user.name);

					if (redirect_url) {
						const outURL = `http://${redirect_url}?token=${data.access_token}`;
						return window.location.replace(outURL);
					}
					// this.$cookies.removeAll();
					window.location.replace(
						process.env.WALULEL_LINK +
							'/products?token=' +
							data.access_token
					);
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
