<template>
	<div
		class="bg-white  px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full md:w-1/2"
	>
		<div class="text-center">
			<a class="">
				<img src="/images/walulel_black.png" alt="" class="h-12 w-12" />
			</a>
			<p class="font-bold text-xl mb-2">Register</p>
			<p class="italic text-xs mb-2">* all fields are required</p>
		</div>
		<form @submit.prevent="register">
			<div class="-mx-3 md:flex mb-6">
				<div class="md:w-1/2 px-3 mb-6 md:mb-0">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="grid-full-name"
					>
						Full Name
					</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
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
				<div class="md:w-1/2 px-3">
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
			<div class="-mx-3 md:flex mb-6">
				<div class="md:w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="grid-email"
					>
						Email
					</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
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
				<div class="md:w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="grid-telephone"
					>
						Phone number
					</label>
					<client-only>
						<vue-tel-input
							class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
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
			<div class="-mx-3 md:flex mb-6">
				<div class="md:w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="grid-password"
					>
						Password
						<span class="text-xs text-gray-500">
							({{ $v.form.password.$params.minLength.min }} digits
							or more)</span
						>
					</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
						id="grid-password"
						type="password"
						placeholder="******************"
						v-model="$v.form.password.$model"
						required
					/>
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
				<div class="md:w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="grid-repeat-password"
					>
						Repeat Password
					</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
						id="grid-repeat-password"
						type="password"
						placeholder="******************"
						v-model="$v.form.password_confirmation.$model"
						required
					/>
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
				<div class="md:w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="grid-country"
					>
						Country
					</label>
					<div class="relative">
						<select
							class="block  w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
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
					</div>
					<p
						class="text-red-500 text-xs italic"
						v-if="$v.form.country.$error && $v.form.country.$dirty"
					>
						Select a country
					</p>
				</div>
				<div class="md:w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
						for="grid-postcode"
					>
						Post Code
					</label>
					<input
						class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
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
			<button
				class="block w-full bg-black text-white font-bold p-2 rounded mt-4 disabled:opacity-75 disabled:cursor-not-allowed"
				type="submit"
				:disabled="$v.$invalid"
			>
				Register
				<i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
			</button>
		</form>
		<Link mainText="Back to Login?" link="/" linkText="Click here" />
	</div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { VueTelInput } from 'vue-tel-input';
import Link from '@/components/common/Link';
export default {
	name: 'registerComponent',
	computed: {
		...mapGetters({
			countries: 'countries/getCountries',
		}),
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

				setTimeout(() => window.location.replace('/'), 5000);
			}
		},
	},
};
</script>

<style></style>
