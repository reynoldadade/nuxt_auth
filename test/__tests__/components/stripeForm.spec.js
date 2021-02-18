import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import StripeForm from '@/components/common/StripeForm.vue';
import { loadStripe } from '@stripe/stripe-js';

import * as checkout from '@/store/checkout.js';

import FactoryCreator from '../../__factory__';
import { FakeUser, FakeAddress, FakeStripe } from '../../__faker__';
import { createSwal } from '../../__mocks__';

jest.mock('@stripe/stripe-js');

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Stripe form actions and props validation', () => {
	let store, wrapper, stripe;

	beforeEach(() => {
		store = new Vuex.Store({
			modules: {
				checkout: {
					namespaced: true,
					...checkout,
				},
			},
		});
		loadStripe.mockClear();
	});

	beforeAll(() => {
		stripe = FakeStripe();
		loadStripe.mockResolvedValue(stripe);
	});

	afterEach(() => {
		store = null;
		if (wrapper) {
			wrapper.destroy();
			wrapper = null;
		}
	});

	test('should check stripe lib loads successfully', async () => {
		const factory = FactoryCreator(StripeForm, {
			store,
			localVue,
		});

		wrapper = factory();

		const fakeUser = FakeUser();
		//set fake user in store
		wrapper.vm.$store.dispatch('checkout/setUser', fakeUser);

		await wrapper.vm.$nextTick();

		expect(loadStripe).toHaveBeenCalledWith(process.env.STRIPE_KEY);
		expect(wrapper.vm.stripe).toBeDefined();

		expect(wrapper.vm.cardElement).toBeDefined();
	});

	test('should check & validate props', async () => {
		const factory = FactoryCreator(StripeForm, {
			store,
			localVue,
			propsData: {
				price: 'GHS 20.00',
				amount: 2000,
				meta: {
					product: 'WaCommunicate',
					package_id: 1,
					payment_type: 'monthly',
				},
				isSubscription: true,
				toggleLoading: () => jest.fn(),
			},
		});

		wrapper = factory();

		const fakeUser = FakeUser();
		//set fake user in store
		wrapper.vm.$store.dispatch('checkout/setUser', fakeUser);

		await wrapper.vm.$nextTick();

		expect(wrapper.vm.price).toBe('GHS 20.00');
		expect(wrapper.vm.meta).toEqual({
			product: 'WaCommunicate',
			package_id: 1,
			payment_type: 'monthly',
		});
	});

	test('should handle monthly & yearly subscriptions', async () => {
		const meta = {
			product: 'WaCommunicate',
			package_id: 1,
			payment_type: 'monthly',
		};
		const factory = FactoryCreator(StripeForm, {
			store,
			localVue,
			propsData: {
				price: 'GHS 20.00',
				amount: 2000,
				meta,
				isSubscription: true,
				toggleLoading: jest.fn(),
				onPaymentDone: jest.fn(),
			},
			mocks: {
				$swal: createSwal(),
				$axios: {
					$post: jest.fn().mockReturnValue(
						new Promise((res, _) => {
							res({
								data: {
									client_secret: 'test_secret_123',
								},
							});
						})
					),
				},
			},
		});

		wrapper = factory();

		const fakeUser = FakeUser();
		//set fake user in store
		wrapper.vm.$store.dispatch('checkout/setUser', fakeUser);
		await wrapper.vm.$nextTick();
		// jest.mock()

		wrapper.vm.onCardFormSubmit();
		expect(wrapper.vm.$swal).toHaveBeenCalledTimes(1);

		//bypass stripe card validation
		wrapper.vm.cardError = null;

		wrapper.vm.onCardFormSubmit();

		//check loading state to visible and stripe intent creation with backend
		expect(wrapper.vm.toggleLoading).toHaveBeenCalledWith(true, false);
		expect(wrapper.vm.$axios.$post).toHaveBeenCalledWith(
			'/checkout/stripe/intent',
			{
				...meta,
				user_id: fakeUser.id,
			}
		);

		//check stripe confirmCardSetup method call successful
		await wrapper.vm.$nextTick();

		//validate subscription with backend
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$axios.$post).lastCalledWith(
			'/checkout/stripe/intent',
			{
				payment_type: meta.payment_type,
				package_id: meta.package_id,
				product: 'WaCommunicate',
				user_id: fakeUser.id,
			}
		);

		//check loading state on subscription success
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.toggleLoading).lastCalledWith(true, false);

		//check paymentDone method call
		expect(wrapper.vm.onPaymentDone).toHaveBeenCalledTimes(0);
	});

	test('should handle one-time & addon payment', async () => {
		const meta = {
			product: 'WaCommunicate',
			package_id: 7,
			payment_type: 'Addon',
		};
		const factory = FactoryCreator(StripeForm, {
			store,
			localVue,
			propsData: {
				price: 'GHS 20.00',
				amount: 2000,
				meta,
				isSubscription: false,
				toggleLoading: jest.fn(),
				onPaymentDone: jest.fn(),
			},
			mocks: {
				$swal: createSwal(),
				$axios: {
					$post: jest.fn().mockReturnValue(
						new Promise((res, _) => {
							res({
								data: {
									client_secret: 'test_secret_123',
								},
							});
						})
					),
				},
			},
		});

		wrapper = factory();

		const fakeUser = FakeUser();
		//set fake user in store
		wrapper.vm.$store.dispatch('checkout/setUser', fakeUser);
		await wrapper.vm.$nextTick();

		wrapper.vm.onCardFormSubmit();
		expect(wrapper.vm.$swal).toHaveBeenCalledTimes(1);

		//bypass stripe card validation
		wrapper.vm.cardError = null;

		wrapper.vm.onCardFormSubmit();

		//check loading state to visible and stripe intent creation with backend
		expect(wrapper.vm.toggleLoading).toHaveBeenCalledWith(true, false);
		expect(wrapper.vm.$axios.$post).toHaveBeenCalledWith(
			'/checkout/stripe/intent',
			{
				...meta,
				user_id: fakeUser.id,
			}
		);

		//check stripe confirmCardPayment method call successful
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.stripe.confirmCardPayment).toHaveBeenCalledTimes(0);

		//check loading state on subscription success
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.toggleLoading).lastCalledWith(true, false);

		//check paymentDone method call
		expect(wrapper.vm.onPaymentDone).toHaveBeenCalledTimes(0);
	});

	// test('should handle failed payments and subscription', async () => {
	// 	const meta = {
	// 		product: 'WaCommunicate',
	// 		package_id: 7,
	// 		payment_type: 'Addon',
	// 	};
	// 	const factory = FactoryCreator(StripeForm, {
	// 		store,
	// 		localVue,
	// 		propsData: {
	// 			price: 'GHS 20.00',
	// 			amount: 2000,
	// 			meta,
	// 			isSubscription: false,
	// 			toggleLoading: jest.fn(),
	// 			onPaymentDone: jest.fn(),
	// 		},
	// 		mocks: {
	// 			$swal: createSwal(),
	// 			$axios: {
	// 				$post: jest.fn().mockReturnValue(
	// 					new Promise((res, _) => {
	// 						res({
	// 							data: {
	// 								client_secret: 'test_secret_123',
	// 							},
	// 						});
	// 					})
	// 				),
	// 			},
	// 		},
	// 	});

	// 	wrapper = factory();

	// 	const fakeUser = FakeUser();
	// 	//set fake user in store
	// 	wrapper.vm.$store.dispatch('checkout/setUser', fakeUser);
	// 	await wrapper.vm.$nextTick();

	// 	wrapper.vm.onCardFormSubmit();
	// 	expect(wrapper.vm.$swal).toHaveBeenCalledTimes(1);

	// 	//bypass stripe card validation
	// 	wrapper.vm.cardError = null;

	// 	wrapper.vm.onCardFormSubmit();

	// });
});
