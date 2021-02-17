import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import LoginForm from '@/components/LoginForm.vue';
import Vuex from 'vuex';
import { merge } from 'lodash';
import Vue from 'vue';
Vue.use(Vuex);

// const axios = {
// 	post: jest.fn(() =>
// 		Promise.resolve({
// 			data: {
// 				token: '12345',
// 			},
// 		})
// 	),
// };

const response = Promise.resolve({
	data: {
		token: '12345',
	},
});

const localVue = createLocalVue();
localVue.use(Vuelidate);
function createStore(overrides) {
	const defaultStoreConfig = {};
	return new Vuex.Store(merge(defaultStoreConfig, overrides));
}

function createWrapper(overrides) {
	const defaultMountingOptions = {
		localVue,
		mocks: {
			$router: { push: jest.fn() },
			$axios: {
				$post: () => response,
			},
		},
		store: createStore(),
	};
	return mount(LoginForm, merge(defaultMountingOptions, overrides));
}

// describe('LoginForm.vue', () => {
// 	let wrapper;
// 	beforeEach(() => {
// 		wrapper = createWrapper();
// 	});

// 	it('After user clicks submit button, $v.$invalid return true?', () => {
// 		const loginBtn = wrapper.find('button#loginButton');
// 		loginBtn.trigger('submit');
// 		expect(wrapper.vm.$v.$invalid).toBeTruthy();
// 	});

// 	it('After filling form form should be valid', async () => {
// 		wrapper.setData({
// 			email: 'test@test.com',
// 			password: 'password123',
// 		});
// 		await Vue.nextTick();
// 		const loginBtn = wrapper.find('button#loginButton');
// 		loginBtn.trigger('submit');
// 		//to check if form is still valid
// 		expect(wrapper.vm.$v.$invalid).toBeFalsy();
// 	});

// 	it('After filling form form should be valid', async () => {
// 		wrapper.setData({
// 			email: 'test@test.com',
// 			password: 'password123',
// 		});
// 		await Vue.nextTick();
// 		const loginBtn = wrapper.find('button#loginButton');
// 		loginBtn.trigger('submit');

// 		return response.then(data => {
// 			expect(data).toEqual({
// 				data: {
// 					token: '12345',
// 				},
// 			});
// 			// expect(wrapper.vm.$router.push).toHaveBeenCalled();
// 			// expect(
// 			// 	wrapper.vm.$router.push.mock.calls[0][0].toEqual({
// 			// 		path: '/profile',
// 			// 	})
// 			// );
// 		});
// 	});
// });
