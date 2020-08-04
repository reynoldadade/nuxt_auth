import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import LoginForm from '@/components/LoginForm.vue';
import axios from 'axios';

const localVue = createLocalVue();
localVue.use(Vuelidate);
jest.mock('axios');
describe('LoginForm', () => {
	test('is a Vue instance', () => {
		const wrapper = mount(LoginForm, {
			localVue,
			stubs: { NuxtLink: RouterLinkStub },
		});
		expect(wrapper.exists()).toBeTruthy();
	});
	it('sets the correct default data', () => {
		expect(typeof LoginForm.data).toBe('function');
		const defaultData = LoginForm.data();
		expect(defaultData.email).toBe('');
		expect(defaultData.password).toBe('');
		expect(defaultData.loading).toBe(false);
		expect(defaultData.error).toBe(false);
		expect(defaultData.errorMessage).toBe('Incorrect username/password.');
	});
	it('it fetches async data when button is clicked', async () => {
		axios.post.mockResolvedValue({
			data: {
				token: '3',
			},
		});
		const wrapper = mount(LoginForm, {
			localVue,
			stubs: { NuxtLink: RouterLinkStub },
		});
		wrapper.find('button#loginButton').trigger('click');
		expect(wrapper.vm.loading).toBe(false);
	});
});
