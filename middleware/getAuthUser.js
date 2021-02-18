import { actionTypes } from '../store/checkout';

export default async function({ app, $axios, store }) {
	const user = store.getters['checkout/user'];

	if (!user) {
		const wa_temp_token = app.$cookies.get('s_token');
		if (wa_temp_token) {
			const res = await $axios
				.$get(`${process.env.API_ENDPOINT}/user/profile`)
				.catch(err => console.log({ err }));
			if (res && res.data) {
				store.dispatch(actionTypes.SET_USER, res.data);
			}
		} else {
			console.log('no token');
		}
	}
}
