export default function({ $axios, store, app, env, redirect, route }) {
	let profile = store.getters['user/getProfile'];
	const user_id = app.$cookies.get('USER_ID');

	// if (user_id != undefined) {
	// 	store.dispatch('app/setUserID', user_id);
	// }
	if (profile == undefined || profile == null) {
		profile = app.$cookies.get('cookie-profile');
	}

	if (profile != undefined) {
		store.dispatch('user/storeProfile', profile);
		return;
	}
	return $axios.get('/user/profile').then(
		({ data }) => {
			console.log(data);
			// if (env.APP_URL == 'wa-communicate.com' && window.mixpanel != undefined) {
			// if (window.mixpanel != undefined) {
			// 	window.mixpanel.identify(data.data.email);
			// 	window.mixpanel.people.set({
			// 		$email: data.data.email,
			// 		$name: data.data.name,
			// 		Product: 'WaInsight',
			// 	});
			// }
			// store.dispatch('app/setUserID', data.data.id);
			app.$cookies.set('user_id', data.data.id, {
				maxAge: 604800,
				path: '/',
				sameSite: true,
			});
			//check subscription

			// const subscription = data.data.subscriptions.wainsight
			// 	? data.data.subscriptions.wainsight.subscription
			// 	: null;
			// //set subscriptions in vuex store
			// store.dispatch('app/setUserSubscription', subscription);
			const {
				name,
				email,
				phone_number,
				avatar,
				id,
				active,
				username,
				postcode,
			} = data.data;
			const profile = {
				name,
				email,
				phone_number,
				avatar,
				id,
				active,
				username,
				postcode,
			};
			store.dispatch('user/storeProfile', profile);
			app.$cookies.set('cookie-profile', profile, {
				path: '/',
				sameSite: true,
			});
			return true;
		},
		error => {
			console.log(error);
			// const redirectAuthURL = `${env.LOGIN_URL}?redirect_url=${env.APP_URL}${route.path}&expect_token=true&refresh_token=true`;
			return redirect('/');
		}
	);
}
