<template>
	<div class="w-full flex flex-wrap">
		<div
			class="bg-white  px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full md:w-1/2"
		></div>
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
				<p class="font-bold text-xl mb-2">UPDATE PROFILE</p>
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
							class="text-black text-xs italic"
							v-if="$v.form.name.$error"
						>
							Please fill out this field.
						</p>
					</div>
					<div class="md:w-1/2 px-3">
						<label
							class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
							for="grid-username"
						>
							Username
						</label>
						<input
							class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
							id="grid-username"
							type="text"
							placeholder="Gulliver"
							v-model="$v.form.username.$model"
							required
						/>
						<p
							class="text-black text-xs italic"
							v-if="$v.form.username.$error"
						>
							Dont forget to add a cool username, 6 characters or
							more
						</p>
						<p class="text-red-500 text-xs italic" v-if="error">
							{{ errorMessages.username }}
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
							class="text-black text-xs italic"
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
						<input
							class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
							id="grid-telephone"
							type="tel"
							placeholder="+000 XXX XX XX XX"
							v-model="$v.form.phone_number.$model"
							required
						/>
						<p
							class="text-black text-xs italic"
							v-if="$v.form.phone_number.$error"
						>
							Please fill out this field.
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
							class="text-grey-dark text-xs italic"
							v-if="
								$v.form.country.$error && $v.form.country.$dirty
							"
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
							class="text-grey-dark text-xs italic"
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
				<div class="flex mt-4">
					<button
						class="block w-1/2 bg-black text-white font-bold p-2 rounded  disabled:opacity-75 disabled:cursor-not-allowed m-2"
						type="submit"
						:disabled="$v.$invalid"
					>
						UPDATE
						<i
							class="fas fa-circle-notch fa-spin"
							v-if="loading"
						></i>
					</button>
					<button
						class="block w-1/2 bg-black text-white font-bold p-2 rounded disabled:opacity-75 disabled:cursor-not-allowed m-2 hover:bg-gray-700"
						type="submit"
					>
						CANCEL
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
export default {
	name: 'register',
	layout: 'main',
	head() {
		return {
			title: 'Walulel | Edit Profile',
		};
	},
	mounted() {
		this.form.username = this.profile.username;
		this.form.name = this.profile.name;
		this.form.phone_number = this.profile.phone_number;
		this.form.email = this.profile.email;
		// this.form.post_code= this.profile.postcode
		this.form.country = this.profile.country;
	},
	computed: {
		...mapGetters({
			countries: 'countries/getCountries',
			profile: 'user/getProfile',
		}),
	},
	data() {
		return {
			loading: false,
			registrationError: '',
			error: false,
			errorMessages: {
				email: '',
				password: '',
				username: '',
			},

			form: {
				name: '',
				username: '',
				phone_number: '',
				email: '',
				post_code: '',
				country: '',
			},
		};
	},
	validations: {
		form: {
			name: {
				required,
			},
			username: {
				required,
				minLength: minLength(6),
			},
			phone_number: {
				required,
			},
			email: {
				required,
				email,
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
			const response = await this.$axios
				.$post('/auth/register', this.form)
				.catch(({ message, response }) => {
					this.error = true;
					this.registrationError = 'Your form has a few problems';
					if (response.status === 422) {
						this.registrationError = 'Your form has a few problems';
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
			}
		},
	},
};
</script>

<style></style>
