<template>
	<form
		class="flex flex-col pt-3 md:pt-8"
		:class="{ shaker: error }"
		@submit.prevent="login"
	>
		<div class="flex flex-col pt-4">
			<label for="email" class="text-lg">Email</label>
			<input
				type="email"
				id="email"
				v-model="$v.email.$model"
				placeholder="Enter your email address"
				required
				class="appearance-none border w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>

		<div class="flex flex-col pt-4">
			<label for="password" class="text-lg">Password</label>
			<div class="flex">
				<input
					:type="showPassword ? 'text' : 'password'"
					id="password"
					v-model="$v.password.$model"
					placeholder="Enter your password"
					required
					class="appearance-none border-t border-l border-b border-r-0  w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
				/>
				<button
					class="py-1 px-3 focus:outline-none  leading-tight appearance-none mt-1 border-t border-r border-b  border-l-0"
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

		<Link
			link="/resetPassword"
			mainText="Forgot Password?"
			linkText="Click Here."
		/>

		<div class="w-full flex justify-around">
			<button
				id="loginButton"
				type="submit"
				:disabled="formValid || loading"
				class="text-white font-bold rounded-full text-lg hover:bg-gray-700 p-2 mt-8 disabled:opacity-75 disabled:cursor-not-allowed w-2/3 _bg-orange"
			>
				Log In
				<i class="fas fa-circle-notch fa-spin" v-show="loading"></i>
			</button>
		</div>
	</form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import Link from '~/components/common/Link';
import getCorrectDomain from '~/assets/js/getCorrectDomain';

export default {
	props: {
		urlQueries: {
			type: String,
			required: true,
		},
	},
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
	components: {
		Link,
	},
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
		...mapGetters({
			getUiConfig: 'components/getUiConfig',
		}),
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
			this.error = false;
			this.loading = true;
			this.$axios
				.$post('auth/login', {
					email: this.email,
					password: this.password,
				})
				.then(
					response => {
						if (response && response.data) {
							const { data } = response;
							const { user } = data;
							const { access_token } = data;

							// return promise and resolve true when cookies and mixpanel process finish
							return new Promise(res => {
								this.$cookies.set('s_token', access_token, {
									path: '/',
									maxAge: 60 * 60 * 24 * 7,
								});
								mixpanel.identify(user.email);

								const products = response.data.tagged_products.map(
									product => product.name
								);

								const country = response.data.user.country;

								// set user profiled products
								this.$cookies.set(
									'interested_products',
									JSON.stringify(products),
									{
										path: '/',
										maxAge: 60 * 60 * 24 * 7,
									}
								);

								// set user country
								this.$cookies.set('user_country', country, {
									path: '/',
									maxAge: 60 * 60 * 24 * 7,
								});

								mixpanel.track('User Logged', {
									User: user.name,
									'Login time': new Date().toLocaleString(),
								});
								res(true);
							}).then(_ => {
								const {
									redirect_url,
									shareLink,
								} = this.$route.query;
								let destination = '';

								// return console.log(
								// 	this.$cookies.get('user_country')
								// );

								if (redirect_url) {
									if (shareLink) {
										return (destination = `http://${redirect_url}?token=${access_token}$shareLink=${shareLink}`);
									}
									return (destination = `http://${redirect_url}?token=${access_token}`);
								} else {
									const {
										tagged_products: products,
										user,
									} = response.data;

									const userIsGhanaian =
										user.country === 'GH';

									const isStaging =
										window.location.hostname ===
											'staging.secure.walulel.com' ||
										/(localhost|((\d{1,3}\.){3}(\d{1,3})))(:\d{1,})?/.test(
											window.location.hostname
										);

									switch (products.length) {
										case 2:
											destination = `https://${
												isStaging ? 'staging.' : ''
											}wa-${
												userIsGhanaian
													? 'communicate'
													: 'insight'
											}.com/?token=${access_token}`;
											break;

										case 1:
											destination = `https://${
												isStaging ? 'staging.' : ''
											}wa-${products[0].slug.slice(
												2
											)}.com/?token=${access_token}`;
											break;

										case 0:
											destination = `https://${
												isStaging ? 'staging.' : ''
											}wa-${
												userIsGhanaian
													? 'communicate'
													: 'insight'
											}.com/?token=${access_token}`;
											break;

										default:
											break;
									}
								}

								return window.location.replace(destination);
							});
						}
					},
					error => {
						const { message, response } = error;
						if (response && response.data) {
							this.errorMessage = response.data.error;
						}
						this.error = true;
					}
				)
				.catch(_ => null)
				.finally(() => {
					this.loading = false;
				});
		},
	},
};
</script>

<style></style>
