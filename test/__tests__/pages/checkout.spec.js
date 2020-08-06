import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Checkout from '@/pages/checkout.vue';
import * as checkout from '@/store/checkout.js';
import FactoryCreator from '../../__factory__';
import { FakeUser, FakePackage } from '../../__faker__';
import { createCookies, createRouter } from '../../__mocks__';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('checkout page interactions', () => {
	let store, wrapper, stubs;
	beforeEach(() => {
		store = new Vuex.Store({
			modules : {
				checkout : {
					namespaced : true,
					...checkout
				}
			}
		});
		stubs = {
			StripeForm: true,
			MoMoPayButton: true,
			Loader: true
		};
	});

	afterEach(() => {
		store = null;
		stubs = null;
		if (wrapper) {
			wrapper.destroy();
			wrapper = null;
		}
	});

	it('should validate token and package information and computed values', () => {
    const factory = FactoryCreator(Checkout, { 
      store, localVue, stubs,
      mocks : {
        $cookies : createCookies(),
        $router: createRouter(),
        $axios : {
          $get : jest.fn().mockResolvedValue(FakePackage())
        }
      }
     });

    wrapper = factory();
	
	//check initial prop values without the token and package info
	expect(wrapper.vm.preError).toBe("Authentication failed");
	expect(wrapper.vm.package_detail).toBe(null);

	const fakeUser = FakeUser();
	
	//set fake user in store
	wrapper.vm.$store.dispatch('checkout/setUser',fakeUser);

	expect(wrapper.vm.user).toBe(fakeUser);
	wrapper.vm.onPreError();
	expect(wrapper.vm.preError).toBe('Invalid transaction information');

});

	// it('should validate form and register showing document upload', async () => {
	// 	const factory = FactoryCreator(Register, {
	// 		store,
	// 		localVue,
	// 		stubs,
	// 		mocks: {
	// 			$swal: createSwal(),
	// 			$cookies: createCookies(),
	// 			$router: createRouter(),
	// 			$axios: {
	// 				$post: jest.fn().mockReturnValue(
	// 					new Promise((res, _) => {
	// 						res({
	// 							data: {
	// 								access_token: 'some_token',
	// 								artisan_id: 1,
	// 							},
	// 						});
	// 					})
	// 				),
	// 			},
	// 		},
	// 	});

	// 	wrapper = factory({
	// 		tags: FakeTags(),
	// 	});

	// 	//Draw boundary required
	// 	wrapper.vm.onFormSubmit();
	// 	expect(wrapper.vm.$swal).toHaveBeenCalledTimes(1);
	// 	expect(wrapper.vm.$swal).lastCalledWith({
	// 		icon: 'error',
	// 		title: 'Oops',
	// 		text: 'Draw a shape around the region you would like to work in',
	// 	});

	// 	wrapper.setData({
	// 		formData: { ...FakeFormData(), password: '1234560' },
	// 		hasDrawn: true,
	// 	});

	// 	//Password should match
	// 	wrapper.vm.onFormSubmit();
	// 	expect(wrapper.vm.$store.getters['hasNotification']).toBe(true);
	// 	expect(wrapper.vm.$store.getters['notifications']).toEqual([
	// 		{
	// 			message: 'Passwords should match',
	// 			type: 'error',
	// 		},
	// 	]);

	// 	//successfully validated
	// 	wrapper.setData({
	// 		formData: FakeFormData(),
	// 	});

	// 	wrapper.vm.onFormSubmit();
	// 	await wrapper.vm.$nextTick();

	// 	expect(wrapper.vm.$axios.$post).toHaveBeenCalledTimes(1);
	// 	expect(wrapper.vm.$swal).toHaveBeenCalledTimes(2);

	// 	//registration completed
	// 	expect(wrapper.vm.$swal).lastCalledWith({
	// 		position: 'top-end',
	// 		icon: 'success',
	// 		title: 'Registration Completed',
	// 		showConfirmButton: false,
	// 		timer: 1500,
	// 	});

	// 	expect(wrapper.vm.$cookies.remove).toHaveBeenCalledTimes(1);
	// 	expect(wrapper.vm.$cookies.remove).lastCalledWith('profile');
	// 	expect(wrapper.vm.$cookies.set).toHaveBeenCalledTimes(2);

	// 	expect(wrapper.vm.$router.replace).lastCalledWith('/verify');
	// });
});
