<template>
	<div
		class="_parent w-full lg:w-1/2 lg:h-screen flex flex-col items-center overflow-y-auto relative"
	>
		<div
			class="text-center lg:text-left pt-10 md:w-5/6 md:mx-auto"
		>
			<a href="/">
				<img
					src="/images/walulel_black.png"
					alt="walulel logo"
					class="inline-block w-16 mb-5"
				/>
			</a>
			<h1 class="font-bold text-2xl">Sign up</h1>
			<Link
				:link="'/' + urlQueries"
				mainText="Already have an account?"
				linkText="Login here."
				:textCenter="false"
			/>
		</div>
		<form @submit.prevent="register" class="w-11/12 md:w-5/6 md:mx-auto">
			<div class="-mx-3 md:flex mb-6">
				<div class="md:w-full px-3 mb-6 md:mb-0">
					<label
						class="block tracking-wide text-grey-darker text-sm font-bold mb-1"
						for="grid-full-name"
					>
						Full Name
					</label>
					<input
						class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="grid-full-name"
						type="text"
						placeholder="Jorge Washingthings"
						v-model="$v.form.name.$model"
						required
					/>
					<p
						class="text-red-500 text-xs italic"
						v-if="$v.form.name.$error"
					>
						Please fill out this field.
					</p>
				</div>
				<div class="hidden md:w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="grid-product"
					>
						Interested in (Product)
					</label>
					<div
						class="flex w-full justify-around border border-gray-400 rounded flex-col"
					>
						<div
							v-for="products in tagged_products"
							:key="products"
						>
							<input
								type="checkbox"
								name="products"
								v-model="$v.form.tagged_products.$model"
								:value="products"
							/>
							<label>{{ products }}</label>
						</div>
					</div>
					<p
						class="text-red-500 text-xs italic"
						v-if="$v.form.tagged_products.$error"
					>
						Select at least one
					</p>
					<p class="text-red-500 text-xs italic" v-if="error">
						{{ errorMessages.tagged_products }}
					</p>
				</div>
			</div>
			<div class="-mx-3 md:flex flex-col mb-5">
				<div class="md:w-full px-3">
					<label
						class="block tracking-wide text-grey-darker text-sm font-bold mb-1"
						for="grid-email"
					>
						Email
					</label>
					<input
						class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="grid-email"
						type="email"
						placeholder="nobody@somebody.com"
						v-model="$v.form.email.$model"
						required
					/>
					<p
						class="text-red-500 text-xs italic"
						v-if="$v.form.email.$error"
					>
						This does not look like an email
					</p>
					<p class="text-red-500 text-xs italic" v-if="error">
						{{ errorMessages.email }}
					</p>
				</div>
				<div class="md:w-full px-3 mt-5">
					<label
						class="block tracking-wide text-grey-darker text-sm font-bold mb-2"
						for="grid-telephone"
					>
						Phone number
					</label>
					<client-only>
						<vue-tel-input
							class="appearance-none border w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="grid-telephone"
							validCharactersOnly
							:mode="'international'"
							placeholder="+000 XXX XX XX XX"
							v-model="$v.form.phone_number.$model"
							:name="'telephone'"
						></vue-tel-input>
					</client-only>
					<p
						class="text-red-500 text-xs italic"
						v-if="$v.form.phone_number.$error"
					>
						Please fill out this field.
					</p>
					<p class="text-red-500 text-xs italic" v-if="error">
						{{ errorMessages.phone_number }}
					</p>
				</div>
			</div>
			<div class="-mx-3 md:flex flex-col mb-6 relative">
				<div class="md:w-full px-3">
					<label
						class="block tracking-wide text-grey-darker text-sm font-bold mb-2"
						for="grid-password"
					>
						Password
						<span class="text-xs text-gray-500">
							({{ $v.form.password.$params.minLength.min }} digits
							or more)</span
						>
					</label>
					<div class="input-group relative">
						<input
							class="_password1 appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline relative"
							id="grid-password"
							:type="showPassword ? 'text' : 'password'"
							placeholder="Enter your password"
							v-model="$v.form.password.$model"
							required
						/>
						<i
							:class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
							class="_toggle-password fas absolute cursor-pointer"
							:title="
								(showPassword ? 'Hide' : 'Show') + ' password'
							"
							@click="toggleShowPassword"
						></i>
					</div>

					<p
						class="text-red-500 text-xs italic"
						v-if="$v.form.password.$error"
					>
						Make it crazy and
						{{
							$v.form.password.$params.minLength.min -
								$v.form.password.$model.length
						}}
						digits to go
					</p>
				</div>
				<div class="md:w-full px-3 mt-5">
					<label
						class="block tracking-wide text-grey-darker text-sm font-bold mb-2"
						for="grid-repeat-password"
					>
						Repeat Password
					</label>
					<div class="input-group relative">
						<input
							class="_password2 appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="grid-repeat-password"
							:type="showPassword2 ? 'text' : 'password'"
							placeholder="Enter your password again"
							v-model="$v.form.password_confirmation.$model"
							required
						/>
						<i
							:class="showPassword2 ? 'fa-eye' : 'fa-eye-slash'"
							class="_toggle-password fas absolute cursor-pointer"
							:title="
								(showPassword2 ? 'Hide' : 'Show') + ' password'
							"
							@click="toggleShowPassword2"
						></i>
					</div>
					<p
						class="text-red-500 text-xs italic"
						v-if="$v.form.password_confirmation.$error"
					>
						Password is not the same
					</p>
					<p class="text-red-500 text-xs italic" v-if="error">
						{{ errorMessages.password }}
					</p>
				</div>
			</div>
			<div class="-mx-3 md:flex mb-2">
				<div class="md:w-2/3 px-3">
					<label
						class="block tracking-wide text-grey-darker text-sm font-bold mb-2"
						for="grid-country"
					>
						Country
					</label>
					<div class="relative w-full">
						<select
							class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline left-0 right-0"
							id="grid-country"
							v-model="$v.form.country.$model"
							required
						>
							<option
								v-for="country in countries"
								:key="country.code"
								:value="country.code"
								>{{ country.name }}</option
							>
						</select>
						<i
							class="fas fa-angle-down absolute right-3 top-3 text-gray-400"
						></i>
					</div>
					<p
						class="text-red-500 text-xs italic"
						v-if="$v.form.country.$error && $v.form.country.$dirty"
					>
						Select a country
					</p>
				</div>
				<div class="md:w-1/3 px-3 mt-5 md:mt-0">
					<label
						class="block tracking-wide text-grey-darker text-sm font-bold mb-2"
						for="grid-postcode"
					>
						Post Code
					</label>
					<input
						class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="grid-postcode"
						type="text"
						placeholder="90210"
						v-model="$v.form.post_code.$model"
						required
					/>
					<p
						class="text-red-500 text-xs italic"
						v-if="$v.form.post_code.$error"
					>
						Postcode is required
					</p>
				</div>
			</div>
			<div
				class="text-center text-red-500"
				v-if="error"
				:class="{ shaker: error }"
			>
				<p>
					<i class="fas fa-exclamation-triangle"></i>
					{{ registrationError }}
				</p>
			</div>
			<div class="text-center pb-10">
				<button
					class="_submit-btn text-white font-bold rounded-full text-lg p-2 mt-5 disabled:opacity-75 disabled:cursor-not-allowed w-2/3 _bg-orange"
					type="submit"
					:disabled="$v.$invalid"
				>
					Register
					<i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { VueTelInput } from 'vue-tel-input';
import Link from '@/components/common/Link';
import getCorrectDomain from '~/assets/js/getCorrectDomain';
import getDestinationAfterRegister from '~/assets/js/getDestinationAfterRegister';

export default {
	name: 'registerComponent',
	computed: {
		...mapGetters({
			countries: 'countries/getCountries',
		}),
		urlQueries() {
			let url_queries = '';

			if (this.$route.query.redirect_url) {
				url_queries += `?redirect_url=${this.$route.query.redirect_url}`;
			}
			if (this.$route.query.expect_token) {
				url_queries += `?expect_token=${this.$route.query.expect_token}`;
			}

			return url_queries;
		},
	},
	components: {
		'vue-tel-input': VueTelInput,
		Link,
	},
	data() {
		return {
			loading: false,
			registrationError: '',
			error: false,
			showPassword: false,
			showPassword2: false,
			errorMessages: {
				email: '',
				password: '',
				tagged_products: '',
				phone_number: '',
			},
			form: {
				name: '',
				username: '',
				phone_number: '',
				email: '',
				password: '',
				password_confirmation: '',
				post_code: '',
				country: 'GB',
				tagged_products: ['WaCommunicate', 'WaInsight'],
			},
			tagged_products: ['WaCommunicate', 'WaInsight'],
		};
	},
	validations: {
		form: {
			name: {
				required,
				minLength: minLength(3),
			},
			tagged_products: {
				required,
			},
			phone_number: {
				required,
			},
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
			post_code: {
				required,
			},
			country: {
				required,
			},
		},
	},
	methods: {
		async register() {
			this.loading = true;
			this.error = false;
			this.errorMessages = {
				email: '',
				password: '',
				username: '',
				phone_number: '',
			};
			//format form
			this.form.phone_number = this.form.phone_number.replace(/\s+/g, '');
			const response = await this.$axios
				.$post('/auth/register', this.form)
				.catch(({ message, response }) => {
					this.error = true;
					this.registrationError = 'Your form has a few problems';
					if (response.status === 422) {
						const errors = Object.keys(response.data.errors);
						errors.map(
							item =>
								(this.errorMessages[item] =
									response.data.errors[item][0])
						);
						//console.log(errorList, 'list');
					} else {
						this.registrationError = response.data.error;
					}
					console.log(response);
				})
				.finally(() => (this.loading = false));
			if (response && response.data) {
				this.notify({
					title: 'Awesome',
					text:
						'Your registration was successful, check your inbox for a verification mail',
					type: 'success',
				});

				this.notify({
					title: 'Redirecting',
					text: 'Redirecting to homepage in 5s',
					type: 'info',
				});

				setTimeout(() => {
					let destination = '';

					const productInUrl =
						this.$route.query.redirect_url &&
						/((staging\.)?wa-(communicate|insight)\.com)/.test(
							this.$route.query.redirect_url
						);

					if (
						productInUrl &&
						this.$v.form.tagged_products.$model.length !== 0
					) {
						destination = `https://${this.$route.query.redirect_url}`;
					} else {
						const isStaging =
							getCorrectDomain(false, window) ===
							'https://staging.walulel.com';

						const userIsGhanaian =
							this.$cookies.get('user_country') === 'GH';

						destination = getDestinationAfterRegister(
							isStaging,
							userIsGhanaian,
							this.form.tagged_products
						);
					}

					window.location.replace(destination);
				}, 5000);
			}
		},
		toggleShowPassword() {
			this.showPassword = !this.showPassword;
		},
		toggleShowPassword2() {
			this.showPassword2 = !this.showPassword2;
		},
	},
	created() {
		const { redirect_url } = this.$route.query;

		let targetProducts = '';
		const productInUrl =
			redirect_url &&
			/((staging\.)?wa-(communicate|insight)\.com)/.test(redirect_url);

		if (productInUrl) {
			if (redirect_url.indexOf('wa-communicate') !== -1) {
				targetProducts = 'WaCommunicate';
			} else if (redirect_url.indexOf('wa-insight') !== -1) {
				targetProducts = 'WaInsight';
			}
		} else {
			targetProducts = null;
		}

		switch (targetProducts) {
			case 'WaCommunicate':
				this.$v.form.tagged_products.$model = ['WaCommunicate'];
				this.form.tagged_products = ['WaCommunicate'];
				this.tagged_products = ['WaCommunicate'];
				break;
			case 'WaInsight':
				this.$v.form.tagged_products.$model = ['WaInsight'];
				this.form.tagged_products = ['WaInsight'];
				this.tagged_products = ['WaInsight'];
				break;
			default:
				this.$v.form.tagged_products.$model = [
					'WaCommunicate',
					'WaInsight',
				];
				this.form.tagged_products = ['WaCommunicate', 'WaInsight'];
				this.tagged_products = ['WaCommunicate', 'WaInsight'];
		}
	},
};
</script>

<style>
._password1,
._password2 {
	padding-right: 45px;
}
._toggle-password {
	top: 11px;
	right: 12px;
}
._submit-btn {
	border: 0 !important;
	outline: 0 !important;
}
@media screen and (min-width: 992px) {
	body {
		overflow-y: hidden !important;
	}
}
._parent::-webkit-scrollbar {
	width: 8px;
	background: #e9e9e9;
}
._parent::-webkit-scrollbar-thumb {
	background: #ccc;
}
._parent::-webkit-scrollbar-thumb:active {
	background: #888;
}
</style>
