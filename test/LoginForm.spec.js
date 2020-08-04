import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import LoginForm from '@/components/LoginForm.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);
jest.mock('axios', () => ({
	get: Promise.resolve('value'),
}));
describe('LoginForm', () => {
	test('is a Vue instance', () => {
		const wrapper = mount(LoginForm, {
			localVue,
			stubs: { NuxtLink: RouterLinkStub },
		});
		expect(wrapper.exists()).toBeTruthy();
	});
	// it('it fetches async data when button is clicked', () => {
	// 	const wrapper = mount(LoginForm, {
	// 		localVue,
	// 		stubs: { NuxtLink: RouterLinkStub },
	// 	});
	// 	wrapper.find('button#loginButton').trigger('click');
	// 	expect(wrapper.text()).toBe('value');
	// });
});
