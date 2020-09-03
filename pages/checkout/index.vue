<template>
	<div class="w-screen h-screen relative overflow-x-hidden">
		<Loader
			v-if="(!appReady && !preError) || isVerifyingPayment"
			:done="isVerified"
			:loading_text="loading_text"
			style="background-color:rgba(255,255,255,0.8);z-index:100"
			class="w-full h-full absolute top-0 left-0 right-0 bottom-0"
		/>
		<div
			v-if="preError"
			class="flex w-full h-full items-center justify-center"
		>
			<div class="rounded border bg-gray-100 p-8 text-center">
				<h3 class="text-2xl">Something went wrong...</h3>
				<p class="text-gray-700 text-sm mb-1">
					Sorry we cannot process your request at this time, try again
					later.
				</p>
				<code class="text-xs bg-red-200 p-1 rounded">{{
					preError
				}}</code>
			</div>
		</div>
		<section
			class="w-full h-full flex flex-wrap relative lg:overflow-hidden"
			v-if="appReady"
		>
			<div
				class="w-full lg:border-r lg:bg-gray-100 xl:w-2/3 lg:w-7/12 lg:h-full flex flex-col p-10 lg:p-16"
			>
				<div class="rounded border bg-white w-full p-8">
					<h2 class="text-2xl mb-1 uppercase">Checkout</h2>
					<div class="bg-gray-400 w-32" style="height:3px"></div>
					<!-- WAPATRON -->
					<div
						class="mt-10 flex flex-wrap xl:w-10/12"
						v-if="run_detail"
					>
						<img
							v-if="run_detail.offer.banner"
							:src="run_detail.offer.banner"
							:alt="run_detail.offer.title"
							class="rounded w-full lg:w-64"
						/>
						<div class="p-5 flex-1">
							<h3 class="text-2xl text-black">
								{{ run_detail.offer.title }}
							</h3>
							<p class="text-gray-700 mt-1 mb-4">
								{{ run_detail.offer.description }}
							</p>
							<span
								title="Promo Code"
								v-if="run_detail.offer.promo_code"
								class="py-1 px-2 rounded text-gray-600 bg-gray-200 font-bold border-2"
								>{{ run_detail.offer.promo_code }}</span
							>
							<div
								class="bg-gray-400 my-5"
								style="height:1px"
							></div>
						</div>
					</div>
					<!-- END OF WAPATRON -->

					<!-- WACOMMUNICATE/WAINSIGHT PACKAGES -->
					<div v-if="vPackage" class="mt-10 flex">
						<div class="flex-1">
							<h3 class="text-xl">{{ vPackage.name }}</h3>
							<span class="text-xs italic text-gray-600"
								>Features</span
							>
							<ul class="block mt-2">
								<li
									v-for="(feature, key) in vFeatures"
									:key="key"
									class="captialize"
									style="padding-bottom:8px"
								>
									<div class="text-gray-600 capitalize">
										<span class="font-bold">{{
											feature
										}}</span>
										{{ key.replace('_', ' ') }}
									</div>
								</li>
							</ul>
							<span>Valid for {{ vPackage.valid_period }}</span>
						</div>
						<div
							class="lg:px-16 flex items-start font-bold text-xl"
						>
							<span class="text-gray-700 mr-2"
								>x{{ quantity }}</span
							>
							<select
								v-if="isAddon"
								name="quantity"
								id="quantity"
								class="wa-input px-2 py-1 text-sm"
								v-model="quantity"
							>
								<option :value="1">1</option>
								<option :value="2">2</option>
								<option :value="3">3</option>
								<option :value="4">4</option>
								<option :value="5">5</option>
								<option :value="6">6</option>
								<option :value="7">7</option>
								<option :value="8">8</option>
								<option :value="9">9</option>
								<option :value="10">10</option>
							</select>
						</div>
						<h3 class="text-xl text-gray-700">{{ stripePrice }}</h3>
					</div>
					<div class="flex justify-end mt-4 pt-2 border-t-2">
						<div class="text-right">
							<h3 class="text-2xl font-bold">
								{{ stripePrice }}
							</h3>
							<span
								class="text-sm text-gray-600"
								v-show="!hideCedi"
								>{{ paystackPrice }}</span
							>
						</div>
					</div>
				</div>
			</div>
			<div
				class="w-full bg-white relative lg:w-5/12 xl:w-1/3 lg:h-full lg:overflow-y-auto justify-center items-center p-10 xl:p-16"
			>
				<StripeForm
					:amount="stripeAmount"
					:price="stripePrice"
					:isSubscription="isSubscription"
					:meta="meta"
					:toggleLoading="toggleLoading"
					:onPaymentDone="onPaymentDone"
				/>
				<div class="w-full lg:pb-20" v-if="showMomo">
					<div class="flex items-center justify-center my-10">
						<div style="height:2px" class="w-32 bg-gray-300"></div>
						<h4 class="mx-3 text-sm font-bold text-gray-500">OR</h4>
						<div style="height:2px" class="w-32 bg-gray-300"></div>
					</div>
					<MoMoPayButton
						:amount="paystackAmount"
						:label="label"
						:currency="paystackCurrency"
						:meta="meta"
						:verifyPayment="verifyPayment"
						:price="paystackPrice"
					/>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	layout: 'checkout',

	components: {
		Loader: () => import('~/components/common/Loader.vue'),
		StripeForm: () => import('~/components/common/StripeForm.vue'),
		MoMoPayButton: () => import('~/components/common/MoMoPayButton.vue'),
	},

	middleware: ['getAuthUser'],

	asyncData({ app }) {
		const _package_ = app.$cookies.get('_package_');
		const _run_id_ = app.$cookies.get('_run_id_');
		const _referrer_ = app.$cookies.get('_referrer_');
		return { pack: _package_, referrer: _referrer_, run_id: _run_id_ };
	},

	data() {
		return {
			pack: null,
			package_detail: null,
			run_detail: null,
			preError: null,
			loading: true,
			quantity: 1,
			isVerifyingPayment: false,
			isVerified: false,
		};
	},
	computed: {
		...mapGetters({
			user: 'checkout/user',
		}),

		userCurrency() {
			return this.user.country == 'GH' ? 'cedis' : 'pounds';
		},

		hideCedi() {
			return this.userCurrency != 'cedis';
		},

		label() {
			return this.vPackage ? this.vPackage.name : 'WaPatron Ads';
		},
		loading_text() {
			return this.appReady
				? this.isVerified
					? 'Payment verified'
					: 'Processing payment...'
				: 'Please wait...';
		},

		appReady() {
			return (
				(this.package_detail != null || this.run_detail != null) &&
				this.user != null
			);
		},
		vPackage() {
			if (this.package_detail) {
				const { id, name, product, valid_period } = this.package_detail;
				return { id, name, product, valid_period };
			}
			return null;
		},

		vFeatures() {
			return this.package_detail ? this.package_detail.features : null;
		},

		product() {
			return this.package_detail
				? this.package_detail.product
				: this.referrer == 'wapatron'
				? 'WaPatron'
				: 'WaArtisan';
		},
		vPricing() {
			return this.package_detail
				? this.package_detail.pricing[this.pack.payment_type]
				: null;
		},

		stripePricing() {
			return this.vPricing ? this.vPricing.pounds : null;
		},

		payStackPricing() {
			return this.vPricing ? this.vPricing.cedis : null;
		},

		stripePrice() {
			return this.stripePricing || this.run_detail
				? Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: this.stripeCurrency,
				  }).format((this.stripeAmount * this.quantity) / 100)
				: null;
		},

		stripeAmount() {
			return this.stripePricing
				? this.stripePricing.amount
				: this.run_detail
				? this.run_detail.paid_amount['GBP']
				: 0;
		},

		stripeCurrency() {
			return this.stripePricing ? this.stripePricing.currency : 'GBP';
		},

		paystackPrice() {
			return this.paystackAmount
				? Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: this.paystackCurrency,
				  }).format((this.paystackAmount * this.quantity) / 100)
				: null;
		},

		paystackAmount() {
			return this.payStackPricing
				? this.payStackPricing.amount
				: this.run_detail
				? this.run_detail.paid_amount['GHS']
				: 0;
		},

		paystackCurrency() {
			return this.payStackPricing
				? this.payStackPricing.currency
				: this.run_detail
				? 'GHS'
				: null;
		},

		isAddon() {
			return (
				(this.package_detail && this.package_detail.type == 'Addon') ||
				false
			);
		},

		isSubscription() {
			return !this.isAddon && this.product != 'WaPatron';
		},

		showMomo() {
			return (
				this.product !== 'WaInsight' &&
				this.paystackAmount <= 500000 &&
				(this.run_detail != null || this.pack.package_id == 1) &&
				this.userCurrency == 'cedis'
			);
		},

		meta() {
			return this.package_detail
				? {
						product: this.product,
						package_id: this.package_detail.id,
						payment_type: this.pack.payment_type,
						addon_quantity: this.quantity,
				  }
				: this.run_detail
				? {
						product: this.product,
						run_id: this.stripeAmount * 6,
						run_token: this.run_id,
						payment_type: 'onetime',
				  }
				: null;
		},
	},

	mounted() {
		this.user ? this.intitateTransaction() : this.onPreError();
	},

	methods: {
		intitateTransaction() {
			if (this.referrer == 'wapatron') {
				return this.intiateWaPatronTransaction();
			}
			return this.initiateWaCommunicateTransaction();
		},

		initiateWaCommunicateTransaction() {
			if (this.pack) {
				this.$axios
					.$get(
						`${process.env.API_ENDPOINT}/checkout/packages/${this.pack.package_id}`
					)
					.then(
						response => {
							if (response && response.data) {
								this.package_detail = response.data;
							}
						},
						error => {
							console.log(error);
							this.onPreError();
						}
					)
					.finally(_ => (this.loading = false));
			} else {
				this.onPreError();
			}
		},

		intiateWaPatronTransaction() {
			if (this.run_id) {
				this.$axios
					.$get(
						`${process.env.WA_PATRON_API}/published-offers?token=${this.run_id}`
					)
					.then(
						response => {
							if (response && response.data) {
								this.run_detail = response.data;
								return;
							}
							this.onPreError();
						},
						error => {
							console.log({ error });
							this.onPreError();
						}
					);
			}
		},

		verifyPayment(reference) {
			this.isVerifyingPayment = true;
			this.$axios
				.$get(
					`${process.env.API_ENDPOINT}/checkout/verify?reference=${reference}`
				)
				.then(
					response => {
						if (response && response.data) {
							if (!response.data.error) {
								this.isVerified = true;
								return this.onPaymentDone();
							}
							this.$swal({
								toast: true,
								position: 'top-end',
								showConfirmButton: false,
								timer: 3000,
								icon: 'error',
								text: response.data.message,
							});
							return;
						}
					},
					error => {
						console.log(error);

						this.$swal({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000,
							icon: 'error',
							text: 'Something went wrong, try again later',
						});
					}
				)
				.finally(_ => (this.isVerifyingPayment = false));
		},

		toggleLoading(visibile, done) {
			this.isVerifyingPayment = visibile;
			this.isVerified = done;
		},

		onPreError() {
			this.preError = !this.user
				? 'Authentication failed'
				: 'Invalid transaction information';
		},

		onPaymentDone() {
			this.$swal({
				title: 'Thank you',
				text:
					'Payment has been received, check your mail for confirmation!',
				icon: 'success',
				showConfirmButton: false,
				timer: 4000,
				onClose: () => this.onSuccessClose(),
			});
		},

		onSuccessClose() {
			new Promise(res => {
				this.$cookies.removeAll();
				res(true);
			}).then((_) => {
				if (this.referrer != "wainsight" && window.top) {
					window.top.postMessage({ status: 200 }, '*');
				} else {
					return this.$router.replace(
						`/checkout/success?refer=${this.referrer}`
					);
				}
			});
		},
	},
};
</script>

<style scoped>
*,
body {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;
}

html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

.wa-input {
	@apply appearance-none border rounded border-gray-400 w-full py-2 px-3 text-gray-700 mb-3 leading-tight m-0;
}

.wa-input:focus,
.wa-input:active {
	@apply outline-none border border-gray-500 shadow-inner;
}
</style>
