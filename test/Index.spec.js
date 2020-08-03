import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import Index from '@/pages/Index.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);
describe('Index', () => {
	test('is a Vue instance', () => {
		const wrapper = mount(Index, {
			localVue,
			stubs: { NuxtLink: RouterLinkStub },
		});
		expect(wrapper.exists()).toBeTruthy();
	});

	test('password is minimum 6 digits', () => {});
});
